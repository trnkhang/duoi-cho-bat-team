import React from 'react';
import { Button } from '@zpi/looknfeel/button';
import type { LastResult } from '@application/game/game.reducer';
import { leadPhoto } from '@share/game/visuals';
import styles from '../../page/GamePage.module.scss';

interface Props {
  open: boolean;
  result?: LastResult;
  onContinue: () => void;
}

export function ResultCard({ open, result, onContinue }: Props) {
  if (!result) return null;
  const { team, points, correct, isReview } = result;
  const d = team.dept;
  const verdictText = isReview
    ? 'Đã bắt được team này 👀'
    : correct
      ? 'Chính xác! 🎯'
      : 'Chưa đúng — nhưng đã lộ diện!';

  return (
    <section className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} role="dialog" aria-modal="true">
      <div className={styles.grab} />
      <div className={styles.result}>
        <div className={`${styles.verdict} ${correct ? styles.ok : styles.no}`}>{verdictText}</div>
        <p className={styles.earn}>
          {isReview ? 'Xem lại thông tin team' : correct ? <>+<b>{points}</b> điểm</> : '+0 điểm'}
        </p>

        <div className={styles.leadcard}>
          <span className={styles.demoBadge}>DEMO</span>
          <div className={styles.avatar}>
            <img alt={`${d.code} head/lead`} src={leadPhoto(d)} />
          </div>
          <p className={styles.leadName}>{team.name}</p>
          <div className={styles.chips}>
            <span className={styles.chipCode}>#{d.code}</span>
          </div>
          <div className={styles.teamBlock}>
            <div className={styles.tbCode}>PHÒNG BAN · {d.code}</div>
            <div className={styles.tbName}>{d.name}</div>
            <div className={styles.tbFunc}>{d.func}</div>
          </div>
        </div>

        <Button type="primary" block onClick={onContinue} style={{ marginTop: 18 }}>
          Chọn bàn tiếp theo →
        </Button>
      </div>
    </section>
  );
}
