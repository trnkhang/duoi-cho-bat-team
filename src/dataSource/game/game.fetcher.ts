import type { Department, Team, DeskLayout, ContextZone, Facility } from './zone-b.data';

/** Shape returned by any zone data source (local mock or future external). */
export interface ZoneData {
  departments: Department[];
  teams: Team[];
  desks: DeskLayout[];
  context: ContextZone[];
  facilities: Facility[];
  map: { w: number; h: number };
  entrance: { x: number; y: number };
}

/** Interchangeable fetcher contract. Local and external implementations
 *  must return the exact same shape so the repository stays source-agnostic. */
export interface GameFetcher {
  getZone(): Promise<ZoneData>;
}
