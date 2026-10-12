import React from 'react';
import { Button } from '@zpi/looknfeel/button';
import type { Team } from '@dataSource/game/zone-b.data';
import { DOMAIN_COLORS } from '@dataSource/game/zone-b.data';
import type { Quiz } from '@application/game/build-quiz';
import { MAX_HINTS } from '@application/game/scoring';
import styles from '../../page/GamePage.module.scss';

interface Props {
  open: boolean;
  quiz?: Quiz;
  current?: Team;
  hintsUsed: number;
  domainRevealed: boolean;
  eliminated: string[];
  wrongPicks: string[];
  solved: boolean;
  onHintDomain: () => void;
  onHintEliminate: () => void;
  onAnswer: (id: string) => void;
}

export function QuizSheet(props: Props) {
  const { open, quiz, current, hintsUsed, domainRevealed, eliminated, wrongPicks, solved } = props;
  if (!quiz || !current) return null;
  const d = current.dept;
  const remaining = MAX_HINTS - hintsUsed;

  const hint = () => {
    if (!domainRevealed) props.onHintDomain();
    else props.onHintEliminate();
  };

  return (
    <section className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} role="dialog" aria-modal="true">
      <div className={styles.grab} />
      <div className={styles.qhead}>
        <span className={styles.qbadge} style={{ background: '#e8eef7', color: '#51607a' }}>?</span>
        <div>
          <h2>Đây là chỗ của team nào?</h2>
          <p>Dựa vào vị trí trên bản đồ — team nào ngồi ở đây?</p>
        </div>
      </div>

      <div className={styles.clue}>
        <div className={styles.clueKey}>Gợi ý</div>
        <div className={styles.clueVal}>Chạm 💡 để lấy gợi ý: lĩnh vực của team, hoặc loại bớt 2 đáp án.</div>
        {domainRevealed && (
          <div className={styles.revealChip} style={{ borderColor: DOMAIN_COLORS[d.domain] }}>
            Lĩnh vực: {d.domain}
          </div>
        )}
      </div>

      <div className={styles.opts}>
        {quiz.options.map((t, i) => {
          const isAnswer = t.id === current.id;
          const isWrongPick = wrongPicks.includes(t.id);
          const isEliminated = eliminated.includes(t.id);
          const cls = [styles.opt];
          if (solved && isAnswer) cls.push(styles.correct);
          if (isWrongPick) cls.push(styles.wrong);
          if (isEliminated) cls.push(styles.eliminated);
          const locked = solved || isWrongPick || isEliminated;
          return (
            <button key={t.id} className={cls.join(' ')} disabled={locked} onClick={() => props.onAnswer(t.id)}>
              <span className={styles.ab}>{'ABCD'[i]}</span>
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.qactions}>
        <Button type="secondary" disabled={solved || remaining <= 0} onClick={hint}>
          💡 Gợi ý (còn {remaining})
        </Button>
      </div>
    </section>
  );
}
