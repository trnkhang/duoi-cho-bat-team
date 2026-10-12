export const ENVIRONMENT = {
  LOCAL: 'local',
  DEVELOP: 'develop',
  STAGING: 'staging',
  PRODUCT: 'product',
} as const;

export type Environment = typeof ENVIRONMENT[keyof typeof ENVIRONMENT];
