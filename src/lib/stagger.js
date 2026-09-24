// Delay (seconds) for the nth item of a revealed list: 40ms steps, never more
// than 80ms, so a whole row lands within ~430ms (350ms reveal + 80ms).
export function staggerDelay(index, step = 0.04, cap = 0.08) {
  return Math.min(index * Math.min(step, 0.04), cap);
}
