import { buildQuiz, wrongOptionIds, shuffle } from './build-quiz';
import type { Team, Department, Domain } from '@dataSource/game/zone-b.data';

const dep = (id: string, domain: Domain, teams: string[]): Department => ({
  id, code: id.toUpperCase(), name: id, domain, color: '#fff', ink: '#000',
  func: 'x'.repeat(20), lead: { name: '', title: 't', photoUrl: '' }, teams,
});

const depA = dep('a', 'Kỹ thuật', ['a1', 'a2', 'a3']);
const depB = dep('b', 'Kỹ thuật', ['b1']);
const depC = dep('c', 'Sản phẩm', ['c1']);
const depD = dep('d', 'Vận hành', ['d1']);
const mkTeams = (d: Department): Team[] => d.teams.map((name) => ({ id: `${d.id}-${name}`, name, dept: d }));
const teams: Team[] = [depA, depB, depC, depD].flatMap(mkTeams);
const a1 = teams.find((t) => t.id === 'a-a1')!;

const seeded = () => { let s = 42; return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff); };

describe('buildQuiz', () => {
  it('always returns exactly 4 unique options including the answer', () => {
    const q = buildQuiz(a1, teams, seeded());
    expect(q.options).toHaveLength(4);
    expect(new Set(q.options.map((o) => o.id)).size).toBe(4);
    expect(q.options.map((o) => o.id)).toContain('a-a1');
  });

  it('prefers sibling teams in the same department as distractors', () => {
    const q = buildQuiz(a1, teams, seeded());
    const siblings = q.options.filter((o) => o.id !== 'a-a1' && o.dept.id === 'a');
    expect(siblings.length).toBeGreaterThanOrEqual(2); // a2 and a3
  });

  it('fills 4 options even for a single-team department', () => {
    const c1 = teams.find((t) => t.id === 'c-c1')!;
    const q = buildQuiz(c1, teams, seeded());
    expect(q.options).toHaveLength(4);
    expect(q.options.map((o) => o.id)).toContain('c-c1');
  });
});

describe('wrongOptionIds', () => {
  it('returns the requested number of non-answer ids', () => {
    const q = buildQuiz(a1, teams, seeded());
    const ids = wrongOptionIds(q, 2, seeded());
    expect(ids).toHaveLength(2);
    expect(ids).not.toContain('a-a1');
  });
});

describe('shuffle', () => {
  it('keeps the same members', () => {
    expect(shuffle([1, 2, 3, 4], seeded()).sort()).toEqual([1, 2, 3, 4]);
  });
});
