export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

export function smoothScrollBehavior() {
  return prefersReducedMotion() ? "auto" : "smooth";
}
