import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { test } from 'node:test';
import { createGithubHandler } from '../api/github-contributions.js';
import { isGithubActivity } from '../src/data/githubActivity.js';

const fakeToken = 'test-token-never-published';
const year = new Date().getFullYear();
const calendar = {
  totalContributions: 10,
  weeks: [{ contributionDays: [
    { date: '2026-01-01', contributionCount: 0, weekday: 4, contributionLevel: 'NONE' },
    { date: '2026-01-02', contributionCount: 3, weekday: 5, contributionLevel: 'FIRST_QUARTILE' },
    { date: '2026-01-03', contributionCount: 7, weekday: 6, contributionLevel: 'FOURTH_QUARTILE' },
  ] }],
};
const success = { data: { user: { contributionsCollection: { contributionCalendar: calendar } } } };

async function withEndpoint(options, check) {
  const server = createServer(createGithubHandler({ token: fakeToken, username: 'Maskirade', ...options }));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/github-contributions?year=${year}`;
  try { await check(url); }
  finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}

test('serves calendar JSON, preserves partial-week positions, and caches successful requests', async () => {
  let calls = 0;
  await withEndpoint({ fetchImpl: async (url, options) => {
    calls += 1;
    assert.equal(url, 'https://api.github.com/graphql');
    assert.equal(options.headers.Authorization, `Bearer ${fakeToken}`);
    const body = JSON.parse(options.body);
    assert.equal(body.variables.username, 'Maskirade');
    assert.equal(body.variables.from, `${year}-01-01T00:00:00Z`);
    assert.equal(body.variables.to, `${year}-12-31T23:59:59Z`);
    return Response.json(success);
  } }, async (url) => {
    const response = await fetch(url);
    assert.equal(response.status, 200);
    assert.ok(response.headers.get('content-type').includes('application/json'));
    assert.equal(response.headers.has('Authorization'), false);
    const text = await response.text();
    assert.ok(!text.includes(fakeToken));
    const data = JSON.parse(text);
    assert.equal(isGithubActivity(data, year), true);
    assert.equal(data.totalContributions, 10);
    assert.equal(data.profileUrl, 'https://github.com/Maskirade');
    assert.equal(data.weeks[0].contributionDays[0].weekday, 4);
    assert.equal(data.weeks[0].contributionDays[2].level, 'FOURTH_QUARTILE');
    await fetch(url);
    assert.equal(calls, 1);
  });
});

test('rejects invalid years and non-GET requests before contacting GitHub', async () => {
  await withEndpoint({ fetchImpl: () => { throw new Error('Must not call GitHub'); } }, async (url) => {
    for (const invalid of ['not-a-year', '0', '2026.5', String(year + 1)]) {
      const response = await fetch(url.replace(/year=\d+/, `year=${invalid}`));
      assert.equal(response.status, 400);
      assert.equal((await response.json()).code, 'INVALID_YEAR');
    }
    const response = await fetch(url, { method: 'POST' });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'GET');
  });
});

for (const [name, upstreamStatus, headers, payload, expectedStatus, expectedCode] of [
  ['expired token', 401, {}, {}, 503, 'AUTH_FAILED'],
  ['insufficient access', 403, {}, {}, 503, 'ACCESS_DENIED'],
  ['rate limit', 403, { 'x-ratelimit-remaining': '0' }, {}, 429, 'RATE_LIMITED'],
  ['secondary rate limit', 403, { 'retry-after': '60' }, {}, 429, 'RATE_LIMITED'],
  ['GraphQL rate limit', 200, {}, { errors: [{ type: 'RATE_LIMITED' }] }, 429, 'RATE_LIMITED'],
  ['missing account', 200, {}, { data: { user: null } }, 404, 'USER_NOT_FOUND'],
  ['GraphQL error', 200, {}, { errors: [{ type: 'SOMETHING_FAILED' }] }, 502, 'GITHUB_API_ERROR'],
  ['malformed calendar', 200, {}, { data: { user: {} } }, 502, 'INVALID_RESPONSE'],
]) {
  test(`returns a safe JSON error for ${name}`, async () => {
    await withEndpoint({ fetchImpl: async () => Response.json(payload, { status: upstreamStatus, headers }) }, async (url) => {
      const response = await fetch(url);
      assert.equal(response.status, expectedStatus);
      const data = await response.json();
      assert.equal(data.code, expectedCode);
      assert.equal(typeof data.error, 'string');
      assert.ok(!JSON.stringify(data).includes(fakeToken));
    });
  });
}

test('missing configuration produces a clear error without calling GitHub', async () => {
  let called = false;
  await withEndpoint({ token: '', fetchImpl: () => { called = true; } }, async (url) => {
    const response = await fetch(url);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'NOT_CONFIGURED');
    assert.equal(called, false);
  });
});

test('does not mistake the last successful quota request for a rate limit', async () => {
  await withEndpoint({ fetchImpl: async () => Response.json(success, { headers: { 'x-ratelimit-remaining': '0' } }) }, async (url) => {
    assert.equal((await fetch(url)).status, 200);
  });
});

test('a failed request can be retried and network details stay private', async () => {
  let calls = 0;
  await withEndpoint({ fetchImpl: async () => {
    if (++calls === 1) throw new Error(`Connection failed: ${fakeToken}`);
    return Response.json(success);
  } }, async (url) => {
    const first = await fetch(url);
    assert.equal(first.status, 502);
    assert.ok(!(await first.text()).includes(fakeToken));
    assert.equal((await fetch(url)).status, 200);
    assert.equal(calls, 2);
  });
});

test('timeouts return a retryable error', async () => {
  await withEndpoint({ fetchImpl: async () => { throw new DOMException('Timed out', 'TimeoutError'); } }, async (url) => {
    const response = await fetch(url);
    assert.equal(response.status, 504);
    assert.equal((await response.json()).code, 'GITHUB_TIMEOUT');
  });
});

test('zero contributions are valid data and malformed day data is rejected', async () => {
  const empty = structuredClone(success);
  empty.data.user.contributionsCollection.contributionCalendar.totalContributions = 0;
  empty.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays.forEach((day) => {
    day.contributionCount = 0;
    day.contributionLevel = 'NONE';
  });
  await withEndpoint({ fetchImpl: async () => Response.json(empty) }, async (url) => {
    const data = await (await fetch(url)).json();
    assert.equal(isGithubActivity(data, year), true);
    assert.equal(data.totalContributions, 0);
    data.weeks[0].contributionDays[0] = null;
    assert.equal(isGithubActivity(data, year), false);
  });
});
