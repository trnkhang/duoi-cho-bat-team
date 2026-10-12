import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { Team } from '@dataSource/game/zone-b.data';
import { GameRepository, gameRepository } from '@dataSource/game/game.repository';
import { buildQuiz, wrongOptionIds } from './build-quiz';
import { gameReducer, initialState, GameState } from './game.reducer';

/** Time the runner character animates toward the selected seat. */
export const RUN_MS = 1150;

/** Per-screen progress persistence — a screen keeps its round across reloads,
 *  so pressing "Bắt đầu" resumes and never resets. Only restart clears it. */
const SAVE_KEY = 'dcbt_progress_v1';

function loadInitial(): GameState {
  try {
    const raw = typeof localStorage !== 'undefined' && localStorage.getItem(SAVE_KEY);
    if (!raw) return initialState;
    const d = JSON.parse(raw);
    return {
      ...initialState,
      score: d.score || 0,
      found: Array.isArray(d.found) ? d.found : [],
      streak: d.streak || 0,
      bestStreak: d.bestStreak || 0,
      attempts: d.attempts || 0,
      correct: d.correct || 0,
    };
  } catch {
    return initialState;
  }
}

function clearProgress() {
  try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ }
}

export function useGame(repo: GameRepository = gameRepository) {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadInitial);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Save progress whenever the scored fields change.
  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        score: state.score, found: state.found, streak: state.streak,
        bestStreak: state.bestStreak, attempts: state.attempts, correct: state.correct,
      }));
    } catch { /* ignore */ }
  }, [state.score, state.found, state.streak, state.bestStreak, state.attempts, state.correct]);

  useEffect(() => {
    let alive = true;
    repo.getZone().then((zone) => {
      if (alive) dispatch({ type: 'LOADED', zone });
    });
    return () => {
      alive = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [repo]);

  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const restart = useCallback(() => { clearProgress(); dispatch({ type: 'RESTART' }); }, []);
  const next = useCallback(() => dispatch({ type: 'CONTINUE' }), []);

  const selectTeam = useCallback(
    (team: Team) => {
      if (!state.zone) return;
      // Only accept map taps while on the map (the card is open but does not
      // dim the map, so ignore taps behind it).
      if (state.status !== 'map') return;
      // Re-opening an already-found team is a read-only review.
      if (state.found.includes(team.id)) {
        dispatch({ type: 'REVIEW', team });
        return;
      }
      dispatch({ type: 'SELECT', team });
      const quiz = buildQuiz(team, state.zone.teams);
      timer.current = setTimeout(() => dispatch({ type: 'ARRIVED', quiz }), RUN_MS);
    },
    [state.zone, state.found, state.status],
  );

  const revealDomain = useCallback(() => dispatch({ type: 'REVEAL_DOMAIN' }), []);
  const eliminate = useCallback(() => {
    if (!state.quiz) return;
    dispatch({ type: 'ELIMINATE', ids: wrongOptionIds(state.quiz, 2) });
  }, [state.quiz]);
  const answer = useCallback((id: string) => dispatch({ type: 'ANSWER', pickedId: id }), []);

  return { state, start, restart, next, selectTeam, revealDomain, eliminate, answer };
}

export type UseGame = ReturnType<typeof useGame>;
