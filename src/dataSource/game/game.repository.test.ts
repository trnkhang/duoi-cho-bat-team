import { GameRepository } from './game.repository';
import type { GameFetcher, ZoneData } from './game.fetcher';

const sample: ZoneData = {
  departments: [], teams: [], desks: [], context: [], facilities: [], map: { w: 980, h: 544 }, entrance: { x: 1, y: 2 },
};

describe('GameRepository', () => {
  it('delegates getZone to the injected fetcher', async () => {
    const fetcher: GameFetcher = { getZone: jest.fn().mockResolvedValue(sample) };
    const repo = new GameRepository(fetcher);

    await expect(repo.getZone()).resolves.toEqual(sample);
    expect(fetcher.getZone).toHaveBeenCalledTimes(1);
  });

  it('defaults to the local fetcher with a complete Zone B dataset', async () => {
    const zone = await new GameRepository().getZone();
    expect(zone.departments.length).toBe(11);
    expect(zone.teams.length).toBeGreaterThanOrEqual(22);
    expect(zone.map).toEqual({ w: 980, h: 544 });
    expect(zone.context.length).toBeGreaterThan(0);
    zone.teams.forEach((t) => {
      expect(t.name).toBeTruthy();
      expect(t.dept.code).toBeTruthy();
      expect(t.dept.func.length).toBeGreaterThan(10);
      // every team has a seat inside its department's real zone bounds
      const desk = zone.desks.find((dk) => dk.team.id === t.id);
      expect(desk).toBeTruthy();
      expect(desk!.rect.x).toBeGreaterThanOrEqual(t.dept.rect.x);
      expect(desk!.rect.y).toBeGreaterThanOrEqual(t.dept.rect.y);
    });
  });
});
