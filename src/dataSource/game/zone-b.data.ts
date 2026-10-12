/**
 * Canonical data for the "Đuổi chỗ bắt team" mini app.
 *
 * Positions & colors follow the real "SEATING LAYOUT - ZONE B" floor plan.
 * Each DEPARTMENT (phòng ban) is a labeled zone; inside are the team cells the
 * player guesses. CONTEXT zones (other seating areas) and FACILITIES are drawn
 * for a faithful map but are not part of the game.
 *
 * Head/lead name & photo are demo placeholders — fill `lead.name`/`lead.photoUrl`.
 */

export type Domain = 'Kỹ thuật' | 'Sản phẩm' | 'Vận hành' | 'Tài chính' | 'Dữ liệu' | 'Nhân sự';

export interface LeadProfile {
  name: string;
  title: string;
  photoUrl: string;
}
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface Department {
  id: string;
  code: string;
  name: string;
  domain: Domain;
  color: string;
  ink: string;
  func: string;
  lead: LeadProfile;
  teams: string[];
  rect: Rect;
}
export interface Team {
  id: string;
  name: string;
  dept: Department;
}
export interface ContextZone {
  code: string;
  color: string;
  ink: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface Facility {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface NumTag {
  n: string;
  x: number;
  y: number;
}

export const MAP = { w: 980, h: 544 };
export const ENTRANCE = { x: 490, y: 532 };

export const DOMAIN_COLORS: Record<Domain, string> = {
  'Kỹ thuật': '#0033c9',
  'Sản phẩm': '#00cf6a',
  'Vận hành': '#00b7ff',
  'Tài chính': '#ff8d00',
  'Dữ liệu': '#0d9488',
  'Nhân sự': '#e3173c',
};

export const DEPARTMENTS: Department[] = [
  { id: 'pft', code: 'PFT', name: 'Payment Financial Tech', domain: 'Tài chính', color: '#e2e6ea', ink: '#2b3442', func: 'Mảng tài chính: ngân hàng, ví (Cashier), quỹ (MMF) và cho vay.', lead: { name: '', title: 'Head of PFT', photoUrl: '' }, teams: ['Bank', 'Cashier', 'MMF', 'Lending'], rect: { x: 8, y: 92, w: 182, h: 222 } },
  { id: 'acc', code: 'ACC', name: 'Accounting', domain: 'Tài chính', color: '#ffab00', ink: '#5c3600', func: 'Kế toán và tài chính nội bộ.', lead: { name: '', title: 'Head of ACC', photoUrl: '' }, teams: ['Accounting'], rect: { x: 288, y: 40, w: 182, h: 80 } },
  { id: 'pcp', code: 'PCP', name: 'Payment Core Platform', domain: 'Kỹ thuật', color: '#f3dd9e', ink: '#6b5312', func: 'Nền tảng & lõi thanh toán, user management, vận hành nền tảng.', lead: { name: '', title: 'Head of PCP', photoUrl: '' }, teams: ['Payment Core', 'UM', 'Operation Platform'], rect: { x: 288, y: 130, w: 182, h: 180 } },
  { id: 'pmt', code: 'PMT', name: 'Payment Merchant & Transaction', domain: 'Sản phẩm', color: '#8fe3ad', ink: '#15502f', func: 'Giải pháp cho merchant và hệ thống billing.', lead: { name: '', title: 'Head of PMT', photoUrl: '' }, teams: ['Merchant Solutions', 'Billing Solutions'], rect: { x: 524, y: 122, w: 232, h: 152 } },
  { id: 'pto', code: 'PTO', name: 'Product & Transaction Ops', domain: 'Vận hành', color: '#f6c7ab', ink: '#7a3e1e', func: 'Vận hành hệ thống: SRE và trực 247.', lead: { name: '', title: 'Head of PTO', photoUrl: '' }, teams: ['SRE', '247'], rect: { x: 288, y: 322, w: 182, h: 54 } },
  { id: 'pse', code: 'PSE', name: 'Payment Security Engineering', domain: 'Kỹ thuật', color: '#ef9d7f', ink: '#6e2f16', func: 'An toàn & bảo mật cho Zalopay.', lead: { name: '', title: 'Head of PSE', photoUrl: '' }, teams: ['Zalopay security'], rect: { x: 288, y: 384, w: 182, h: 34 } },
  { id: 'ptech', code: 'PTech', name: 'Platform Technology', domain: 'Dữ liệu', color: '#a9c3ea', ink: '#1c3461', func: 'AI Enablement và Data Science.', lead: { name: '', title: 'Head of PTech', photoUrl: '' }, teams: ['AI Enablement', 'Data science'], rect: { x: 524, y: 330, w: 112, h: 74 } },
  { id: 'pdp', code: 'PDP', name: 'Product Data Platform', domain: 'Dữ liệu', color: '#6f9bd8', ink: '#ffffff', func: 'Nền tảng dữ liệu sản phẩm.', lead: { name: '', title: 'Head of PDP', photoUrl: '' }, teams: ['Data Platform'], rect: { x: 646, y: 330, w: 110, h: 74 } },
  { id: 'pge', code: 'PGE', name: 'Payment Gateway Engineering', domain: 'Sản phẩm', color: '#2b457a', ink: '#ffffff', func: 'CRM và các giải pháp marketing.', lead: { name: '', title: 'Head of PGE', photoUrl: '' }, teams: ['CRM', 'Marketing Solutions'], rect: { x: 524, y: 412, w: 232, h: 102 } },
  { id: 'pct', code: 'PCT', name: 'Payment Core Transaction', domain: 'Kỹ thuật', color: '#bfe0f5', ink: '#0b3f5c', func: 'Giao dịch lõi: OTA, chuyển tiền, Home & Platform.', lead: { name: '', title: 'Head of PCT', photoUrl: '' }, teams: ['OTA', 'Money transfer', 'Home + Platform'], rect: { x: 772, y: 352, w: 182, h: 162 } },
  { id: 'hrpy', code: 'HRPY', name: 'People & Culture (HR)', domain: 'Nhân sự', color: '#cfd4dc', ink: '#2b3442', func: 'Tuyển dụng, phát triển con người và xây dựng văn hóa.', lead: { name: '', title: 'Head of HR', photoUrl: '' }, teams: ['People & Culture'], rect: { x: 8, y: 28, w: 182, h: 58 } },
];

export const CONTEXT: ContextZone[] = [
  { code: 'PCF', color: '#e2e6ea', ink: '#2b3442', x: 212, y: 74, w: 60, h: 72 },
  { code: 'PCP', color: '#f3dd9e', ink: '#6b5312', x: 212, y: 160, w: 60, h: 150 },
  { code: 'PES', color: '#f3bf45', ink: '#5c3d00', x: 418, y: 128, w: 50, h: 54 },
  { code: 'UXUI', color: '#6d4636', ink: '#ffffff', x: 288, y: 430, w: 182, h: 42 },
  { code: 'ZOP', color: '#13a394', ink: '#ffffff', x: 524, y: 74, w: 232, h: 44 },
  { code: 'OPCS', color: '#cfcff4', ink: '#2f2f74', x: 772, y: 74, w: 182, h: 210 },
  { code: 'Blank', color: '#dfe3f5', ink: '#6b739a', x: 772, y: 290, w: 182, h: 30 },
  { code: 'ProOps', color: '#3cbdf8', ink: '#063b5c', x: 772, y: 326, w: 182, h: 20 },
];

export const FACILITIES: Facility[] = [
  { label: 'WAREHOUSE', x: 524, y: 40, w: 232, h: 22 },
  { label: 'MEETING ROOMS', x: 8, y: 332, w: 182, h: 104 },
  { label: 'ZALOPAY PANTRY', x: 8, y: 458, w: 470, h: 52 },
];

export const NUMS: NumTag[] = [
  { n: '73', x: 120, y: 326 }, { n: '10', x: 242, y: 60 }, { n: '14', x: 242, y: 320 },
  { n: '59', x: 380, y: 330 }, { n: '66', x: 636, y: 286 }, { n: '72', x: 900, y: 328 },
  { n: '36', x: 470, y: 480 }, { n: '60', x: 636, y: 522 }, { n: '54', x: 940, y: 522 },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
export const TEAMS: Team[] = DEPARTMENTS.flatMap((d) => d.teams.map((name) => ({ id: `${d.id}-${slug(name)}`, name, dept: d })));
export function teamsOf(deptId: string): Team[] {
  return TEAMS.filter((t) => t.dept.id === deptId);
}

export interface DeskLayout {
  team: Team;
  rect: Rect;
  center: { x: number; y: number };
}

/** Each team owns a vertical strip of the department's real zone (seats render
 *  inside the strip). The strip is the clickable/runner-target region. */
export function buildDesks(): DeskLayout[] {
  const desks: DeskLayout[] = [];
  DEPARTMENTS.forEach((d) => {
    const r = d.rect;
    const teams = teamsOf(d.id);
    const n = teams.length;
    const bx = r.x + 6;
    const by = r.y + 6;
    const bw = r.w - 12;
    const bh = r.h - 12;
    const gp = 3;
    const cols = Math.max(n * 2, Math.floor((bw + gp) / (12 + gp)));
    const asw = (bw - (cols - 1) * gp) / cols;
    const base = Math.floor(cols / n);
    const extra = cols % n;
    let colStart = 0;
    teams.forEach((team, k) => {
      const tc = base + (k < extra ? 1 : 0);
      const tx = bx + colStart * (asw + gp);
      const tw = tc * asw + (tc - 1) * gp;
      desks.push({ team, rect: { x: tx, y: by, w: tw, h: bh }, center: { x: tx + tw / 2, y: by + bh / 2 } });
      colStart += tc;
    });
  });
  return desks;
}
