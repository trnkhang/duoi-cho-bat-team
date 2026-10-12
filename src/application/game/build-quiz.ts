import type { Team } from '@dataSource/game/zone-b.data';

export interface Quiz {
  answer: Team;
  /** 4 options including the answer, order randomized. */
  options: Team[];
}

export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build a 4-option quiz for `answer`. Distractors prefer sibling teams in the
 * same department (so multi-team departments are a real guess), then teams in
 * the same domain, then anything — always filling 4 options.
 */
export function buildQuiz(
  answer: Team,
  allTeams: Team[],
  rand: () => number = Math.random,
): Quiz {
  const others = allTeams.filter((t) => t.id !== answer.id);
  const siblings = shuffle(others.filter((t) => t.dept.id === answer.dept.id), rand);
  const sameDomain = shuffle(others.filter((t) => t.dept.id !== answer.dept.id && t.dept.domain === answer.dept.domain), rand);
  const rest = shuffle(others.filter((t) => t.dept.domain !== answer.dept.domain), rand);
  const distractors = [...siblings, ...sameDomain, ...rest].slice(0, 3);
  return { answer, options: shuffle([answer, ...distractors], rand) };
}

/** Pick up to two wrong options to eliminate for the "50/50" hint. */
export function wrongOptionIds(quiz: Quiz, count = 2, rand: () => number = Math.random): string[] {
  const wrong = shuffle(quiz.options.filter((o) => o.id !== quiz.answer.id), rand);
  return wrong.slice(0, count).map((o) => o.id);
}
