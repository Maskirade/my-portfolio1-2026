import { profile } from '../src/data/profile.js';
import { isGithubActivity } from '../src/data/githubActivity.js';

const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(
          from: $from
          to: $to
        ) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
                contributionLevel
              }
            }
          }
        }
      }
    }
`;

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export function createGithubHandler({
  token = process.env.GITHUB_TOKEN,
  username = process.env.GITHUB_USERNAME || new URL(profile.socials.github).pathname.slice(1),
  fetchImpl = fetch,
} = {}) {
  const cache = new Map();
  const login = username.trim();

  return async function handler(req, res) {
    const fail = (status, code, error) => sendJson(res, status, { code, error });

    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return fail(405, 'METHOD_NOT_ALLOWED', 'This endpoint accepts GET requests.');
    }

    const currentYear = new Date().getFullYear();
    const requestedYear = new URL(req.url, 'http://localhost').searchParams.get('year');
    const year = requestedYear === null ? currentYear : Number(requestedYear);
    if ((requestedYear !== null && !/^\d{4}$/.test(requestedYear))
      || !Number.isInteger(year) || year < 2000 || year > currentYear) {
      return fail(400, 'INVALID_YEAR', 'Choose a valid contribution year.');
    }
    if (!token?.trim()) {
      return fail(503, 'NOT_CONFIGURED', 'GitHub activity is temporarily unavailable.');
    }
    if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(login)) {
      return fail(503, 'INVALID_USERNAME', 'GitHub activity is temporarily unavailable.');
    }

    const cached = cache.get(year);
    if (cached && cached.expires > Date.now()) return sendJson(res, 200, cached.data);

    try {
      const response = await fetchImpl('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            username: login,
            from: `${year}-01-01T00:00:00Z`,
            to: `${year}-12-31T23:59:59Z`,
          },
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (response.status === 401) {
        return fail(503, 'AUTH_FAILED', 'GitHub activity is temporarily unavailable.');
      }
      if (response.status === 429 || (!response.ok && (response.headers.get('x-ratelimit-remaining') === '0' || response.headers.has('retry-after')))) {
        return fail(429, 'RATE_LIMITED', 'GitHub is busy. Please try again later.');
      }
      if (response.status === 403) {
        return fail(503, 'ACCESS_DENIED', 'GitHub activity is temporarily unavailable.');
      }
      if (!response.ok) {
        return fail(502, 'GITHUB_API_ERROR', 'Unable to load GitHub activity. Please try again.');
      }

      const result = await response.json();
      if (result.errors?.some((error) => error.type === 'RATE_LIMITED')) {
        return fail(429, 'RATE_LIMITED', 'GitHub is busy. Please try again later.');
      }
      if (result.errors?.some((error) => error.type === 'NOT_FOUND') || result.data?.user === null) {
        return fail(404, 'USER_NOT_FOUND', 'This GitHub profile is unavailable.');
      }
      if (result.errors?.length) {
        return fail(502, 'GITHUB_API_ERROR', 'Unable to load GitHub activity. Please try again.');
      }

      const calendar = result.data?.user?.contributionsCollection?.contributionCalendar;
      const activity = {
        username: login,
        profileUrl: `https://github.com/${login}`,
        year,
        totalContributions: calendar?.totalContributions,
        weeks: Array.isArray(calendar?.weeks) ? calendar.weeks.map((week) => ({
          contributionDays: Array.isArray(week?.contributionDays) ? week.contributionDays.map((day) => ({
            date: day?.date,
            count: day?.contributionCount,
            weekday: day?.weekday,
            level: day?.contributionLevel,
          })) : null,
        })) : null,
      };
      if (!isGithubActivity(activity, year)) {
        return fail(502, 'INVALID_RESPONSE', 'Unable to load GitHub activity. Please try again.');
      }

      cache.set(year, { data: activity, expires: Date.now() + 5 * 60 * 1000 });
      return sendJson(res, 200, activity);
    } catch (error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        return fail(504, 'GITHUB_TIMEOUT', 'GitHub took too long to respond. Please try again.');
      }
      return fail(502, 'GITHUB_UNAVAILABLE', 'Unable to reach GitHub. Please try again.');
    }
  };
}

export default createGithubHandler();
