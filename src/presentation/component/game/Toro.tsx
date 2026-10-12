import React from 'react';
import styles from '../../page/GamePage.module.scss';

/** Mascot "Zippy" — a simple, bold Zalopay buddy (blue body, green cap, big
 *  eyes). Rendered as an SVG group centered on its feet so it can be translated
 *  to a target seat and keep the leg/arm run animation. */
export function ToroRunner({ running, style }: { running: boolean; style?: React.CSSProperties }) {
  return (
    <g className={`${styles.runner} ${running ? styles.runnerRun : ''}`} style={style}>
      <ellipse className={styles.runnerShadow} cx={0} cy={13} rx={11} ry={3} />
      <g className={styles.runnerBody}>
        <rect className={`${styles.leg} ${styles.legL}`} x={-5} y={2} width={4} height={11} rx={2} fill="#1b2a44" />
        <rect className={`${styles.leg} ${styles.legR}`} x={1} y={2} width={4} height={11} rx={2} fill="#243654" />
        <rect x={-7} y={-9} width={14} height={16} rx={7} fill="#00cf6a" />
        <rect className={`${styles.arm} ${styles.armL}`} x={-10} y={-6} width={4} height={10} rx={2} fill="#00b85e" />
        <rect className={`${styles.arm} ${styles.armR}`} x={6} y={-6} width={4} height={10} rx={2} fill="#00b85e" />
        <circle cx={0} cy={-15} r={8} fill="#0033c9" />
        <circle cx={-3} cy={-16} r={1.5} fill="#fff" />
        <circle cx={3} cy={-16} r={1.5} fill="#fff" />
        <path d="M-3,-12 q3,2.5 6,0" fill="none" stroke="#fff" strokeWidth={1.3} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Standing mascot for the intro brand panel (blue head + green body). */
export function ToroMascot() {
  return (
    <svg viewBox="0 0 120 120" width="118" height="118" aria-hidden>
      <ellipse cx="60" cy="104" rx="30" ry="6" fill="#0b1b33" opacity=".12" />
      <rect x="46" y="66" width="28" height="30" rx="12" fill="#00cf6a" />
      <rect x="34" y="70" width="14" height="7" rx="3.5" fill="#00b85e" transform="rotate(24 41 73)" />
      <rect x="72" y="70" width="14" height="7" rx="3.5" fill="#00b85e" transform="rotate(-24 79 73)" />
      <circle cx="60" cy="42" r="26" fill="#0033c9" />
      <circle cx="51" cy="40" r="4.5" fill="#fff" /><circle cx="69" cy="40" r="4.5" fill="#fff" />
      <circle cx="52" cy="41" r="2.2" fill="#0b1b33" /><circle cx="70" cy="41" r="2.2" fill="#0b1b33" />
      <path d="M50 52c6 5 14 5 20 0" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
