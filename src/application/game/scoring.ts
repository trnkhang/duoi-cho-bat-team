export const MAX_HINTS = 2;

/** Points awarded for a correct guess given how many hints were used.
 *  0 hints → 100, 1 hint → 70, 2 hints → 40. A wrong guess scores 0. */
export function pointsFor(hintsUsed: number, correct: boolean): number {
  if (!correct) return 0;
  const table = [100, 70, 40];
  const idx = Math.max(0, Math.min(hintsUsed, table.length - 1));
  return table[idx];
}

export interface Accuracy {
  attempts: number;
  correct: number;
}

/** Rounded accuracy percentage; 0 when nothing has been attempted. */
export function accuracyPercent({ attempts, correct }: Accuracy): number {
  if (attempts <= 0) return 0;
  return Math.round((correct / attempts) * 100);
}
