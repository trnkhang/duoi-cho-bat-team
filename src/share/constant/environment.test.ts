import { ENVIRONMENT } from './environment';

describe('environment constants', () => {
  it('keeps hosted environment values stable', () => {
    expect(ENVIRONMENT.DEVELOP).toBe('develop');
    expect(ENVIRONMENT.STAGING).toBe('staging');
    expect(ENVIRONMENT.PRODUCT).toBe('product');
  });
});
