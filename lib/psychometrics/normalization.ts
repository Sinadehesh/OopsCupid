/**
 * Normalizes a value from an arbitrary min-max scale into a standard 0-100 percentage.
 */
export function normalise(value: number, scaleMin: number, scaleMax: number): number {
  return Math.round(
    Math.min(100, Math.max(0, ((value - scaleMin) / (scaleMax - scaleMin)) * 100))
  );
}
