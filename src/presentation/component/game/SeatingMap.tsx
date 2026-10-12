import React, { useMemo } from 'react';
import type { Team } from '@dataSource/game/zone-b.data';
import type { ZoneData } from '@dataSource/game/game.fetcher';
import { shade, hexA } from '@share/game/visuals';
import { ToroRunner } from './Toro';
import styles from '../../page/GamePage.module.scss';

interface Props {
  zone: ZoneData;
  found: string[];
  runningTo?: Team;
  running: boolean;
  onPick: (team: Team) => void;
  onContext: (code: string) => void;
}

/** Render the small seats filling a team's strip. */
function seats(rect: { x: number; y: number; w: number; h: number }, fill: string, stroke: string) {
  const gp = 3;
  const cols = Math.max(1, Math.floor((rect.w + gp) / (12 + gp)));
  const rows = Math.max(1, Math.floor((rect.h + gp) / (10 + gp)));
  const sw = (rect.w - (cols - 1) * gp) / cols;
  const sh = (rect.h - (rows - 1) * gp) / rows;
  const out: JSX.Element[] = [];
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
    out.push(<rect key={`${c}-${r}`} x={rect.x + c * (sw + gp)} y={rect.y + r * (sh + gp)} width={sw} height={sh} rx={1.5} fill={fill} stroke={stroke} strokeWidth={0.5} />);
  }
  return out;
}

export function SeatingMap({ zone, found, runningTo, running, onPick, onContext }: Props) {
  const deskByTeam = useMemo(() => Object.fromEntries(zone.desks.map((d) => [d.team.id, d])), [zone.desks]);
  const target = runningTo && deskByTeam[runningTo.id] ? deskByTeam[runningTo.id].center : zone.entrance;

  return (
    <svg className={styles.map} viewBox={`0 0 ${zone.map.w} ${zone.map.h}`} preserveAspectRatio="xMidYMid meet" aria-label="Sơ đồ chỗ ngồi Zone B">
      <rect x={0} y={26} width={zone.map.w} height={514} rx={14} fill="#f1f5fb" />
      <rect x={0} y={2} width={zone.map.w} height={20} rx={4} fill="#0b2a86" />
      <text className={styles.mapbar} x={zone.map.w / 2} y={15}>SEATING LAYOUT — ZONE B</text>

      {/* Facilities (landmarks for orientation) */}
      {zone.facilities.map((f) => (
        <g key={f.label} className={styles.room}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={8} fill="#fff" stroke="#c7d4e8" strokeDasharray="5 5" strokeWidth={1.3} />
          {f.label === 'MEETING ROOMS' && [1, 2, 3].map((i) => (
            <line key={i} x1={f.x + 8} y1={f.y + i * (f.h / 4)} x2={f.x + f.w - 8} y2={f.y + i * (f.h / 4)} stroke="#e4ebf6" strokeWidth={1} />
          ))}
          <text className={styles.facLabel} x={f.x + f.w / 2} y={f.y + f.h / 2 + 3} textAnchor="middle" fill={f.label === 'ZALOPAY PANTRY' ? '#1aa85a' : '#8a97ad'}>{f.label}</text>
        </g>
      ))}

      {/* Landmark seating areas (not playable) */}
      {zone.context.map((c, i) => (
        <g key={c.code + i} className={styles.room} onClick={() => onContext(c.code)}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={6} fill={hexA(c.color, 0.6)} stroke={hexA(c.color, 0.9)} strokeWidth={1} />
          <text className={styles.ctxLabel} x={c.x + c.w / 2} y={c.y + c.h / 2 + 3.5} textAnchor="middle" fill={c.ink}>{c.code}</text>
        </g>
      ))}

      {/* Playable department zones — white box, NO label (guess by position) */}
      {zone.departments.map((d) => (
        <rect key={d.id} className={styles.room} x={d.rect.x} y={d.rect.y} width={d.rect.w} height={d.rect.h} rx={9} fill="#fff" stroke={d.color} strokeWidth={2.2} />
      ))}

      {/* Team seats (grouped by team strip) */}
      {zone.desks.map(({ team, rect, center }) => {
        const d = team.dept;
        const isFound = found.includes(team.id);
        const isTarget = runningTo?.id === team.id && !running;
        return (
          <g key={team.id} className={styles.desk} onClick={() => onPick(team)}>
            {seats(rect, isFound ? d.color : hexA(d.color, 0.3), isFound ? shade(d.color, -20) : hexA(d.color, 0.5))}
            {isTarget && <circle className={`${styles.ring} ${styles.ringOn}`} cx={center.x} cy={center.y} r={Math.min(rect.w, rect.h) / 2 - 3} />}
            <circle cx={center.x} cy={center.y} r={11} fill="#fff" opacity={0.9} />
            {isFound
              ? <path d={`M ${center.x - 4.8} ${center.y} l 2.8 3.4 l 5.6 -6.8`} stroke="#00a152" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              : <text x={center.x} y={center.y + 5} textAnchor="middle" fill={shade(d.color, -34)} className={styles.deskQ}>?</text>}
          </g>
        );
      })}

      <ToroRunner running={running} style={{ transform: `translate(${target.x}px, ${target.y}px)` }} />
    </svg>
  );
}
