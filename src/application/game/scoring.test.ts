import { pointsFor, accuracyPercent } from './scoring';

describe('pointsFor', () => {
  it('rewards fewer hints with more points', () => {
    expect(pointsFor(0, true)).toBe(100);
    expect(pointsFor(1, true)).toBe(70);
    expect(pointsFor(2, true)).toBe(40);
  });
  it('clamps out-of-range hint counts', () => {
    expect(pointsFor(5, true)).toBe(40);
    expect(pointsFor(-1, true)).toBe(100);
  });
  it('scores 0 for a wrong guess regardless of hints', () => {
    expect(pointsFor(0, false)).toBe(0);
    expect(pointsFor(2, false)).toBe(0);
  });
});

describe('accuracyPercent', () => {
  it('returns 0 when there are no attempts', () => {
    expect(accuracyPercent({ attempts: 0, correct: 0 })).toBe(0);
  });
  it('rounds to the nearest percent', () => {
    expect(accuracyPercent({ attempts: 3, correct: 2 })).toBe(67);
    expect(accuracyPercent({ attempts: 16, correct: 15 })).toBe(94);
  });
});
