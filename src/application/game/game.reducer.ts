import type { Team } from '@dataSource/game/zone-b.data';
import type { ZoneData } from '@dataSource/game/game.fetcher';
import type { Quiz } from './build-quiz';
import { pointsFor, MAX_HINTS } from './scoring';

export type GameStatus =
  | 'loading'
  | 'intro'
  | 'map'
  | 'running'
  | 'quiz'
  | 'result'
  | 'summary';

export interface LastResult {
  team: Team;
  points: number;
  correct: boolean;
  isReview: boolean;
}

export interface GameState {
  status: GameStatus;
  zone?: ZoneData;
  score: number;
  found: string[];
  streak: number;
  bestStreak: number;
  attempts: number;
  correct: number;
  current?: Team;
  quiz?: Quiz;
  hintsUsed: number;
  domainRevealed: boolean;
  eliminated: string[];
  /** Options the player picked and got wrong this round (kept disabled). */
  wrongPicks: string[];
  last?: LastResult;
}

export const initialState: GameState = {
  status: 'loading',
  score: 0,
  found: [],
  streak: 0,
  bestStreak: 0,
  attempts: 0,
  correct: 0,
  hintsUsed: 0,
  domainRevealed: false,
  eliminated: [],
  wrongPicks: [],
};

export type GameAction =
  | { type: 'LOADED'; zone: ZoneData }
  | { type: 'START' }
  | { type: 'SELECT'; team: Team }
  | { type: 'ARRIVED'; quiz: Quiz }
  | { type: 'REVEAL_DOMAIN' }
  | { type: 'ELIMINATE'; ids: string[] }
  | { type: 'ANSWER'; pickedId: string }
  | { type: 'REVIEW'; team: Team }
  | { type: 'CONTINUE' }
  | { type: 'RESTART' };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'LOADED':
      // If this screen already has progress (resumed), skip the intro so the
      // next player continues the same round instead of starting over.
      return {
        ...state,
        zone: action.zone,
        status: state.found.length > 0 || state.attempts > 0 ? 'map' : 'intro',
      };
    case 'START':
      return { ...state, status: 'map' };
    case 'SELECT':
      return {
        ...state,
        status: 'running',
        current: action.team,
        hintsUsed: 0,
        domainRevealed: false,
        eliminated: [],
        wrongPicks: [],
      };
    case 'ARRIVED':
      return { ...state, status: 'quiz', quiz: action.quiz };
    case 'REVEAL_DOMAIN':
      if (state.hintsUsed >= MAX_HINTS) return state;
      return { ...state, hintsUsed: state.hintsUsed + 1, domainRevealed: true };
    case 'ELIMINATE':
      if (state.hintsUsed >= MAX_HINTS) return state;
      return {
        ...state,
        hintsUsed: state.hintsUsed + 1,
        eliminated: [...state.eliminated, ...action.ids],
      };
    case 'ANSWER': {
      if (!state.current) return state;
      const correct = action.pickedId === state.current.id;
      // Wrong guess: never reveal the answer. Keep the team unsolved and the
      // quiz open so the next player can keep trying (multiplayer-friendly).
      if (!correct) {
        return {
          ...state,
          attempts: state.attempts + 1,
          streak: 0,
          wrongPicks: state.wrongPicks.includes(action.pickedId)
            ? state.wrongPicks
            : [...state.wrongPicks, action.pickedId],
        };
      }
      const points = pointsFor(state.hintsUsed, true);
      const streak = state.streak + 1;
      const found = state.found.includes(state.current.id)
        ? state.found
        : [...state.found, state.current.id];
      return {
        ...state,
        status: 'result',
        score: state.score + points,
        attempts: state.attempts + 1,
        correct: state.correct + 1,
        streak,
        bestStreak: Math.max(state.bestStreak, streak),
        found,
        last: { team: state.current, points, correct: true, isReview: false },
      };
    }
    case 'REVIEW':
      return {
        ...state,
        status: 'result',
        current: action.team,
        last: { team: action.team, points: 0, correct: true, isReview: true },
      };
    case 'CONTINUE': {
      const total = state.zone?.teams.length ?? 0;
      const done = total > 0 && state.found.length >= total;
      return { ...state, status: done ? 'summary' : 'map', last: undefined };
    }
    case 'RESTART':
      return { ...initialState, status: 'map', zone: state.zone };
    default:
      return state;
  }
}
