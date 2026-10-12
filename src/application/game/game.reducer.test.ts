import { gameReducer, initialState, GameState } from './game.reducer';
import type { Team } from '@dataSource/game/zone-b.data';
import type { ZoneData } from '@dataSource/game/game.fetcher';

const dept = { id: 'd', code: 'D', name: 'Dept', domain: 'Kỹ thuật' as const, color: '#fff', ink: '#000', func: 'x'.repeat(20), lead: { name: '', title: 't', photoUrl: '' }, teams: [] as string[] };
const team = (id: string): Team => ({ id, name: id, dept });

const zone = (teams: Team[]): ZoneData => ({ departments: [dept], teams, desks: [], context: [], facilities: [], map: { w: 980, h: 544 }, entrance: { x: 0, y: 0 } });

const ready = (teams: Team[]): GameState =>
  gameReducer(gameReducer(initialState, { type: 'LOADED', zone: zone(teams) }), { type: 'START' });

describe('gameReducer', () => {
  it('awards full points for a correct answer with no hints', () => {
    let s = ready([team('a'), team('b')]);
    s = gameReducer(s, { type: 'SELECT', team: team('a') });
    s = gameReducer(s, { type: 'ANSWER', pickedId: 'a' });
    expect(s.score).toBe(100);
    expect(s.streak).toBe(1);
    expect(s.found).toContain('a');
    expect(s.last?.correct).toBe(true);
  });

  it('reduces points per hint and caps hints at two', () => {
    let s = ready([team('a'), team('b'), team('c')]);
    s = gameReducer(s, { type: 'SELECT', team: team('a') });
    s = gameReducer(s, { type: 'REVEAL_DOMAIN' });
    s = gameReducer(s, { type: 'ELIMINATE', ids: ['b'] });
    s = gameReducer(s, { type: 'REVEAL_DOMAIN' }); // ignored, already 2
    expect(s.hintsUsed).toBe(2);
    s = gameReducer(s, { type: 'ANSWER', pickedId: 'a' });
    expect(s.score).toBe(40);
  });

  it('does NOT reveal or mark found on a wrong answer, so others can retry', () => {
    let s = ready([team('a'), team('b')]);
    s = gameReducer(s, { type: 'SELECT', team: team('a') });
    s = gameReducer(s, { type: 'ANSWER', pickedId: 'b' });
    expect(s.score).toBe(0);
    expect(s.streak).toBe(0);
    expect(s.found).not.toContain('a');
    expect(s.status).toBe('quiz'); // quiz stays open for another try
    expect(s.wrongPicks).toContain('b');
    // a later correct guess still wins
    s = gameReducer(s, { type: 'ANSWER', pickedId: 'a' });
    expect(s.status).toBe('result');
    expect(s.found).toContain('a');
    expect(s.score).toBe(100);
  });

  it('goes to summary once every team is found', () => {
    let s = ready([team('a')]);
    s = gameReducer(s, { type: 'SELECT', team: team('a') });
    s = gameReducer(s, { type: 'ANSWER', pickedId: 'a' });
    s = gameReducer(s, { type: 'CONTINUE' });
    expect(s.status).toBe('summary');
  });
});
