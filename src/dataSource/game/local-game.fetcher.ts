import type { GameFetcher, ZoneData } from './game.fetcher';
import { DEPARTMENTS, TEAMS, CONTEXT, FACILITIES, MAP, ENTRANCE, buildDesks } from './zone-b.data';

/** Local, offline source of truth used for review builds and development.
 *  Mirrors the response an external endpoint would return. */
export class LocalGameFetcher implements GameFetcher {
  async getZone(): Promise<ZoneData> {
    return {
      departments: DEPARTMENTS,
      teams: TEAMS,
      desks: buildDesks(),
      context: CONTEXT,
      facilities: FACILITIES,
      map: MAP,
      entrance: ENTRANCE,
    };
  }
}
