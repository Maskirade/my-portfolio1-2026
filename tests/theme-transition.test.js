import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createThemeTransition } from '../src/lib/themeTransition.js';

const flush = () => new Promise((resolve) => setImmediate(resolve));
const anchor = (left, top, width = 48, height = 24) => ({
  getBoundingClientRect: () => ({ left, top, width, height }),
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function setup({ reduced = false, native = true, clip = true, width = 1280, height = 800 } = {}) {
  const classes = new Set();
  const properties = new Map();
  const timers = new Map();
  const motionListeners = new Set();
  const resizeListeners = new Set();
  const changes = [];
  const transitions = [];
  let now = 0, timerId = 0;
  const motion = {
    matches: reduced,
    addEventListener: (_, callback) => motionListeners.add(callback),
    removeEventListener: (_, callback) => motionListeners.delete(callback),
  };
  const document = {
    documentElement: {
      classList: {
        add: (...names) => names.forEach((name) => classes.add(name)),
        remove: (...names) => names.forEach((name) => classes.delete(name)),
      },
      style: {
        setProperty: (name, value) => properties.set(name, value),
        removeProperty: (name) => properties.delete(name),
      },
    },
  };
  if (native) document.startViewTransition = (update) => {
    const ready = deferred(), finished = deferred();
    const record = {
      ready: ready.promise,
      finished: finished.promise,
      skipped: 0,
      skipTransition() { record.skipped += 1; },
      commit() { update(); ready.resolve(); },
      complete() { finished.resolve(); },
      failSnapshot() { ready.reject(new Error('Snapshot unavailable')); finished.resolve(); },
    };
    transitions.push(record);
    return record;
  };
  const window = {
    innerWidth: width,
    innerHeight: height,
    CSS: { supports: () => clip },
    matchMedia: () => motion,
    setTimeout(callback, delay) {
      const id = ++timerId;
      timers.set(id, { callback, due: now + delay });
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
    addEventListener: (_, callback) => resizeListeners.add(callback),
    removeEventListener: (_, callback) => resizeListeners.delete(callback),
  };
  function advance(milliseconds) {
    const end = now + milliseconds;
    while (true) {
      const next = [...timers.entries()].filter(([, timer]) => timer.due <= end)
        .sort((a, b) => a[1].due - b[1].due)[0];
      if (!next) break;
      now = next[1].due;
      timers.delete(next[0]);
      next[1].callback();
    }
    now = end;
  }
  const controller = createThemeTransition({ applyTheme: (theme) => changes.push(theme), document, window });
  return {
    controller, changes, transitions, properties, classes, timers, document, window,
    motionListeners, resizeListeners, advance,
    reduceMotion(value) { motion.matches = value; motionListeners.forEach((callback) => callback()); },
    resize() { resizeListeners.forEach((callback) => callback()); },
  };
}

test('captures the old theme before updating and reveals either new theme from the button', async () => {
  const env = setup();
  env.controller.change('light', anchor(100, 700));
  assert.deepEqual(env.changes, []);
  assert.equal(env.properties.get('--theme-ripple-x'), '124px');
  assert.equal(env.properties.get('--theme-ripple-y'), '712px');
  env.transitions[0].commit();
  assert.deepEqual(env.changes, ['light']);
  env.transitions[0].complete(); await flush();
  assert.equal(env.classes.size, 0);
  assert.equal(env.properties.size, 0);
  assert.equal(env.timers.size, 0);
  env.controller.change('dark', anchor(100, 700));
  env.transitions[1].commit(); env.transitions[1].complete(); await flush();
  assert.deepEqual(env.changes, ['light', 'dark']);
  env.controller.dispose();
});

test('the ripple covers every viewport corner on desktop and mobile', () => {
  for (const [width, height, left, top] of [[1920, 1080, 30, 1000], [320, 568, 250, 16]]) {
    const env = setup({ width, height });
    env.controller.change('light', anchor(left, top));
    const x = Number.parseFloat(env.properties.get('--theme-ripple-x'));
    const y = Number.parseFloat(env.properties.get('--theme-ripple-y'));
    const radius = Number.parseFloat(env.properties.get('--theme-ripple-radius'));
    for (const [cornerX, cornerY] of [[0, 0], [0, height], [width, 0], [width, height]]) {
      assert.ok(radius > Math.hypot(cornerX - x, cornerY - y));
    }
    env.controller.dispose();
  }
});

test('rapid requests keep only the latest queued theme and never overlap snapshots', async () => {
  const env = setup();
  env.controller.change('light', anchor(100, 700));
  env.controller.change('dark', anchor(200, 16));
  env.controller.change('light', anchor(250, 16));
  assert.equal(env.transitions.length, 1);
  assert.equal(env.transitions[0].skipped, 2);
  env.transitions[0].commit(); env.transitions[0].complete(); await flush();
  assert.equal(env.transitions.length, 2);
  assert.equal(env.properties.get('--theme-ripple-x'), '274px');
  env.transitions[1].commit(); env.transitions[1].complete(); await flush();
  assert.equal(env.changes.at(-1), 'light');
  assert.ok(!env.changes.includes('dark'));
  assert.equal(env.classes.size, 0);
  env.controller.dispose();
});

test('reduced motion switches directly without snapshots, timers, or overlays', () => {
  const env = setup({ reduced: true });
  env.controller.change('light'); env.controller.change('dark');
  assert.deepEqual(env.changes, ['light', 'dark']);
  assert.equal(env.transitions.length, 0);
  assert.equal(env.timers.size, 0);
  assert.equal(env.classes.size, 0);
  env.controller.dispose();
});

for (const [name, options] of [['no View Transition API', { native: false }], ['no circular clipping', { clip: false }]]) {
  test(`uses a color fade with ${name}, then cleans up`, () => {
    const env = setup(options);
    env.controller.change('light');
    assert.deepEqual(env.changes, ['light']);
    assert.equal(env.transitions.length, 0);
    assert.ok(env.classes.has('theme-fade'));
    env.advance(350);
    assert.equal(env.classes.size, 0);
    assert.equal(env.timers.size, 0);
    env.controller.dispose();
  });
}

test('a synchronous browser error falls back without losing the theme change', () => {
  const env = setup();
  env.document.startViewTransition = () => { throw new Error('API unavailable'); };
  env.controller.change('light');
  assert.deepEqual(env.changes, ['light']);
  assert.ok(env.classes.has('theme-fade'));
  assert.equal(env.properties.size, 0);
  env.advance(350); assert.equal(env.classes.size, 0);
  env.controller.dispose();
});

test('a rejected snapshot still applies the selected theme and clears transition styles', async () => {
  const env = setup();
  env.controller.change('light');
  env.transitions[0].failSnapshot(); await flush();
  assert.deepEqual(env.changes, ['light']);
  assert.equal(env.classes.size, 0);
  assert.equal(env.timers.size, 0);
  env.controller.dispose();
});

test('a stuck transition times out, and its late callback cannot override a newer theme', async () => {
  const env = setup();
  env.controller.change('light');
  env.advance(1700);
  assert.deepEqual(env.changes, ['light']);
  assert.equal(env.classes.size, 0);
  env.controller.change('dark');
  env.transitions[1].commit();
  env.transitions[0].commit(); env.transitions[0].complete(); await flush();
  assert.deepEqual(env.changes, ['light', 'dark']);
  assert.ok(env.classes.has('theme-ripple'));
  env.transitions[1].complete(); await flush();
  env.controller.dispose();
});

test('changing motion preferences cancels the ripple and applies the queued theme directly', async () => {
  const env = setup();
  env.controller.change('light'); env.controller.change('dark');
  env.reduceMotion(true);
  assert.ok(env.transitions[0].skipped > 0);
  env.transitions[0].commit(); env.transitions[0].complete(); await flush();
  assert.equal(env.transitions.length, 1);
  assert.equal(env.changes.at(-1), 'dark');
  assert.equal(env.classes.size, 0);
  env.controller.dispose();
});

test('viewport resize skips the obsolete reveal without losing the theme', async () => {
  const env = setup();
  env.controller.change('light'); env.resize();
  assert.equal(env.transitions[0].skipped, 1);
  env.transitions[0].commit(); env.transitions[0].complete(); await flush();
  assert.deepEqual(env.changes, ['light']);
  assert.equal(env.classes.size, 0);
  env.controller.dispose();
});

test('unmount clears listeners and timers, and late callbacks cannot change the page', async () => {
  const env = setup();
  env.controller.change('light'); env.controller.change('dark');
  env.controller.dispose();
  env.transitions[0].commit(); env.transitions[0].complete(); await flush();
  env.controller.change('light');
  assert.deepEqual(env.changes, []);
  assert.equal(env.classes.size, 0);
  assert.equal(env.timers.size, 0);
  assert.equal(env.motionListeners.size, 0);
  assert.equal(env.resizeListeners.size, 0);
});
