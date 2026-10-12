import type { GameFetcher, ZoneData } from './game.fetcher';
import { LocalGameFetcher } from './local-game.fetcher';

/** Single wrapper over interchangeable fetchers. Presentation and Application
 *  depend on this repository, never on a concrete fetcher. */
export class GameRepository {
  constructor(private readonly fetcher: GameFetcher = new LocalGameFetcher()) {}

  getZone(): Promise<ZoneData> {
    return this.fetcher.getZone();
  }
}

/** Default repository bound to the local source (used by review builds). */
export const gameRepository = new GameRepository();
