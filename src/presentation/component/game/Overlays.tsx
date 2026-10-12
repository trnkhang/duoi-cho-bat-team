import React from 'react';
import { Button } from '@zpi/looknfeel/button';
import { accuracyPercent } from '@application/game/scoring';
import { ToroMascot } from './Toro';
import styles from '../../page/GamePage.module.scss';

export function IntroOverlay({ open, onStart }: { open: boolean; onStart: () => void }) {
  return (
    <div className={`${styles.overlay} ${open ? styles.overlayOn : ''}`}>
      <div className={styles.ocard}>
        <div className={styles.ocBrand}>
          <div className={styles.mascot} aria-hidden><ToroMascot /></div>
          <h1>Đuổi chỗ bắt team</h1>
          <p className={styles.leadSub}>Khám phá sơ đồ chỗ ngồi của Zalopay Tech — Zone B một cách thật vui!</p>
        </div>
        <div className={styles.ocBody}>
          <div className={styles.rules}>
            <div className={styles.rule}><span className={styles.n}>1</span><p>Chạm vào <b>một khu chỗ ngồi</b> bất kỳ — nhân vật sẽ <b>chạy tới</b> đó.</p></div>
            <div className={styles.rule}><span className={`${styles.n} ${styles.g}`}>2</span><p>Đoán đó là <b>team nào</b> trong 4 đáp án, có kèm <b>mô tả chức năng</b>.</p></div>
            <div className={styles.rule}><span className={`${styles.n} ${styles.o}`}>3</span><p>Bí quá? Dùng tối đa <b>2 gợi ý</b> — nhưng điểm sẽ giảm nhé.</p></div>
            <div className={styles.rule}><span className={`${styles.n} ${styles.p}`}>4</span><p>Đoán xong, gặp mặt <b>head/lead</b> của team.</p></div>
          </div>
          <Button type="primary" block onClick={onStart}>Bắt đầu chơi 🎮</Button>
          <p className={styles.footNote}>Dữ liệu team &amp; lead là nội dung minh họa (demo) — đội ngũ sẽ cập nhật tên, ảnh và mô tả thật.</p>
        </div>
      </div>
    </div>
  );
}

interface SummaryProps {
  open: boolean;
  score: number;
  found: number;
  total: number;
  attempts: number;
  correct: number;
  bestStreak: number;
  onReplay: () => void;
}

export function SummaryOverlay(p: SummaryProps) {
  const perfect = p.correct === p.total;
  return (
    <div className={`${styles.overlay} ${p.open ? styles.overlayOn : ''}`}>
      <div className={styles.ocard}>
        <div className={styles.ocBrand}>
          <div className={styles.mascot} aria-hidden>
            <svg viewBox="0 0 120 120" width="118" height="118">
              <circle cx="60" cy="60" r="46" fill="#fff5d6" />
              <path d="M60 24l9 20 22 2-16 15 5 22-20-11-20 11 5-22-16-15 22-2 9-20Z" fill="#ff8d00" />
            </svg>
          </div>
          <h1>{perfect ? 'Hoàn hảo! 🏆' : 'Hoàn thành! 🎉'}</h1>
          <p className={styles.leadSub}>
            {perfect ? 'Bạn thuộc lòng sơ đồ Zone B rồi!' : 'Bạn đã bắt được toàn bộ team của Zone B!'}
          </p>
        </div>
        <div className={styles.ocBody}>
          <div className={styles.summaryGrid}>
            <div className={styles.sg}><div className={styles.sgK}>Tổng điểm</div><div className={styles.sgV}>{p.score}</div></div>
            <div className={styles.sg}><div className={styles.sgK}>Team đã bắt</div><div className={styles.sgV}>{p.found}/{p.total}</div></div>
            <div className={styles.sg}><div className={styles.sgK}>Độ chính xác</div><div className={styles.sgV}>{accuracyPercent({ attempts: p.attempts, correct: p.correct })}%</div></div>
            <div className={styles.sg}><div className={styles.sgK}>Chuỗi dài nhất</div><div className={styles.sgV}>{p.bestStreak}</div></div>
          </div>
          <Button type="primary" block onClick={p.onReplay}>Chơi lại 🔁</Button>
        </div>
      </div>
    </div>
  );
}
