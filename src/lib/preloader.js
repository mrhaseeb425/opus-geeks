// Lets page content (the home hero's entrance) wait until the one-time
// preloader has lifted, so the animation isn't played underneath it.
export const PRELOADER_DONE_EVENT = "og:preloader-done";

let done = false;

export function isPreloaderDone() {
  return done;
}

export function markPreloaderDone() {
  if (done) return;
  done = true;
  window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
}
