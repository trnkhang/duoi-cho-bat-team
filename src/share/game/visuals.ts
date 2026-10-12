import type { Department } from '@dataSource/game/zone-b.data';

/** Lighten (positive) or darken (negative) a hex color by a percentage. */
export function shade(hex: string, p: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const f = (t: number) => Math.max(0, Math.min(255, Math.round(t + (t * p) / 100)));
  return '#' + [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, '0')).join('');
}

export function hexA(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/** Department head/lead avatar (person silhouette) used when no photo is set. */
export function departmentAvatar(d: Department): string {
  const txt = d.ink === '#ffffff' ? '#ffffff' : '#243654';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='102' height='102'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${shade(d.color, 14)}'/>
      <stop offset='1' stop-color='${shade(d.color, -22)}'/></linearGradient></defs>
    <rect width='102' height='102' fill='url(#g)'/>
    <circle cx='51' cy='37' r='16' fill='${txt}' opacity='.92'/>
    <path d='M22 96c2-18 15-26 29-26s27 8 29 26' fill='${txt}' opacity='.92'/>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

export function leadPhoto(d: Department): string {
  return d.lead.photoUrl && d.lead.photoUrl.length ? d.lead.photoUrl : departmentAvatar(d);
}
