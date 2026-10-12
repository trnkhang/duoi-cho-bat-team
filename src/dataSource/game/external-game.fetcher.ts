import type { GameFetcher, ZoneData } from './game.fetcher';
import { HttpClient } from '@dataSource/http/http-client';

/** Example external source. Wire a real endpoint when the team hosts the
 *  seating data. The response must match {@link ZoneData}. */
export class ExternalGameFetcher implements GameFetcher {
  constructor(private readonly http: HttpClient, private readonly baseUrl: string) {}

  async getZone(): Promise<ZoneData> {
    return this.http.get<ZoneData>(`${this.baseUrl}/zone-b`);
  }
}
