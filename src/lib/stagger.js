export function staggerDelay(index, step = 0.08, cap = 0.48) {
  return Math.min(index * step, cap);
}
