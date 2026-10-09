const RIPPLE_DURATION = 700;
const FADE_DURATION = 350;
const RIPPLE_PROPERTIES = ['--theme-ripple-x', '--theme-ripple-y', '--theme-ripple-radius'];

// Own one transition for both theme buttons; retain only the latest queued request.
export function createThemeTransition({
  applyTheme,
  document = globalThis.document,
  window = globalThis.window,
}) {
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = null;
  let queued = null;
  let disposed = false;

  const clearStyles = () => {
    root.classList.remove('theme-ripple', 'theme-fade');
    RIPPLE_PROPERTIES.forEach((property) => root.style.removeProperty(property));
  };

  function finish(run) {
    if (active !== run || disposed) return;
    window.clearTimeout(run.timer);
    clearStyles();
    active = null;
    const next = queued;
    queued = null;
    if (next) start(next);
  }

  function start(request) {
    if (disposed) return;
    if (motion.matches) {
      applyTheme(request.theme);
      return;
    }

    const run = { transition: null, timer: null, applied: false };
    active = run;
    const update = () => {
      if (disposed || active !== run || run.applied) return;
      run.applied = true;
      applyTheme(request.theme);
    };
    const fade = () => {
      clearStyles();
      root.classList.add('theme-fade');
      update();
      run.timer = window.setTimeout(() => finish(run), FADE_DURATION);
    };

    if (typeof document.startViewTransition !== 'function'
      || !window.CSS?.supports('clip-path', 'circle(1px at 1px 1px)')) {
      fade();
      return;
    }

    const { x, y } = request.origin;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ) + 8;
    root.style.setProperty('--theme-ripple-x', `${x}px`);
    root.style.setProperty('--theme-ripple-y', `${y}px`);
    root.style.setProperty('--theme-ripple-radius', `${radius}px`);
    root.classList.add('theme-ripple');

    try {
      run.transition = document.startViewTransition(update);
    } catch {
      fade();
      return;
    }

    // ready can reject when a tab is hidden or a snapshot cannot be taken.
    run.transition.ready.catch(() => {});
    run.transition.finished.then(update, update).finally(() => finish(run));
    run.timer = window.setTimeout(() => {
      if (disposed || active !== run) return;
      run.transition.skipTransition();
      update();
      finish(run);
    }, RIPPLE_DURATION + 1000);
  }

  const interrupt = () => {
    if (!active) return;
    if (active.transition) active.transition.skipTransition();
    else finish(active);
  };
  const onMotionChange = () => {
    if (motion.matches) interrupt();
  };
  motion.addEventListener('change', onMotionChange);
  window.addEventListener('resize', interrupt);

  return {
    change(theme, anchor) {
      if (disposed) return;
      // Button bounds work equally for pointer, touch, and keyboard activation.
      const bounds = anchor?.getBoundingClientRect();
      const origin = {
        x: Math.max(0, Math.min(window.innerWidth, bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2)),
        y: Math.max(0, Math.min(window.innerHeight, bounds ? bounds.top + bounds.height / 2 : window.innerHeight / 2)),
      };
      const request = { theme, origin };
      if (active) {
        queued = request;
        active.transition?.skipTransition();
      } else start(request);
    },
    dispose() {
      disposed = true;
      queued = null;
      if (active) {
        window.clearTimeout(active.timer);
        active.transition?.skipTransition();
      }
      active = null;
      clearStyles();
      motion.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', interrupt);
    },
  };
}
