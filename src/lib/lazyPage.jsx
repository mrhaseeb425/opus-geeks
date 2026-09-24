import { lazy } from "react";

// Route-level code splitting that never flashes a loading state once a chunk
// is available: after `preload()` resolves, the real component renders
// directly instead of going through React.lazy's suspend-for-a-tick path.
export function lazyPage(load) {
  let Loaded = null;
  let pending = null;
  const preload = () => {
    pending ??= load().then((module) => {
      Loaded = module.default;
      return module;
    });
    return pending;
  };
  const LazyPage = lazy(preload);

  function Page(props) {
    return Loaded ? <Loaded {...props} /> : <LazyPage {...props} />;
  }
  Page.preload = preload;
  return Page;
}

// Fetch the remaining route chunks once the browser is idle, so later
// navigations are instant without adding to the first load.
export function preloadWhenIdle(pages) {
  const run = () => pages.forEach((page) => page.preload());
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(run, { timeout: 3000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(run, 1500);
  return () => window.clearTimeout(id);
}
