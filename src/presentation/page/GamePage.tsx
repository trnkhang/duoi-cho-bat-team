import React, { useCallback, useEffect, useState } from 'react';
import { useGame } from '@application/game/use-game';
import { SeatingMap } from '@presentation/component/game/SeatingMap';
import { QuizSheet } from '@presentation/component/game/QuizSheet';
import { ResultCard } from '@presentation/component/game/ResultCard';
import { IntroOverlay, SummaryOverlay } from '@presentation/component/game/Overlays';
import styles from './GamePage.module.scss';

export default function GamePage() {
  const g = useGame();
  const { state } = g;
  const [toast, setToast] = useState('');

  const flash = useCallback((msg: string) => setToast(msg), []);
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const onAnswer = useCallback(
    (id: string) => {
      g.answer(id);
      if (state.current && id !== state.current.id) flash('Chưa đúng 😅 — thử lại nhé!');
    },
    [g, state.current, flash],
  );

  const onContext = useCallback((code: string) => flash(`Khu ${code} — chỉ để định vị, không thuộc vòng chơi.`), [flash]);


  if (!state.zone) {
    return <main className={styles.app} aria-busy="true"><div className={styles.loading}>Đang tải sơ đồ…</div></main>;
  }

  const quizOpen = state.status === 'quiz';
  const resultOpen = state.status === 'result';
  const scrimOn = quizOpen || resultOpen;
  const running = state.status === 'running';
  const total = state.zone.teams.length;

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brandrow}><span className={styles.logo}>Z</span><span className={styles.brand}>Zalopay Tech · Zone B</span></div>
        <h1 className={styles.title}>Đuổi chỗ bắt team 🏃‍♂️💨</h1>
        <p className={styles.subtitle}>Chạm vào một bàn — đoán xem team nào ngồi đó!</p>
        <div className={styles.hstats}>
          <div className={styles.stat}><div className={styles.k}>ĐIỂM</div><div className={styles.v}>{state.score}</div></div>
          <div className={styles.stat}><div className={styles.k}>ĐÃ BẮT ĐƯỢC</div><div className={styles.v}>{state.found.length}<small>/ {total} team</small></div></div>
          <div className={styles.stat}><div className={styles.k}>CHUỖI ĐÚNG</div><div className={styles.v}>{state.streak}🔥</div></div>
        </div>
      </header>

      <div className={styles.stage}>
        <div className={styles.maphint}><span className={styles.dot} />{running ? 'Đang chạy tới địa điểm… 🏃' : 'Chạm vào một ô team trên bản đồ để đoán'}</div>
        <div className={styles.mapwrap}>
          <div className={styles.mapcard}>
            <SeatingMap zone={state.zone} found={state.found} runningTo={state.current} running={running} onPick={g.selectTeam} onContext={onContext} />
          </div>
        </div>
      </div>

      <div className={`${styles.scrim} ${scrimOn ? styles.scrimOn : ''}`} onClick={() => resultOpen && g.next()} />

      <QuizSheet
        open={quizOpen}
        quiz={state.quiz}
        current={state.current}
        hintsUsed={state.hintsUsed}
        domainRevealed={state.domainRevealed}
        eliminated={state.eliminated}
        wrongPicks={state.wrongPicks}
        solved={false}
        onHintDomain={g.revealDomain}
        onHintEliminate={g.eliminate}
        onAnswer={onAnswer}
      />

      <ResultCard open={resultOpen} result={state.last} onContinue={g.next} />

      <IntroOverlay open={state.status === 'intro'} onStart={g.start} />
      <SummaryOverlay
        open={state.status === 'summary'}
        score={state.score}
        found={state.found.length}
        total={total}
        attempts={state.attempts}
        correct={state.correct}
        bestStreak={state.bestStreak}
        onReplay={g.restart}
      />

      <div className={`${styles.toast} ${toast ? styles.toastOn : ''}`}>{toast}</div>
    </main>
  );
}
