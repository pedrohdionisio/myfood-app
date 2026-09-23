export const AUTH_PROFILES = ['customer', 'driver'] as const;

export type AuthProfile = (typeof AUTH_PROFILES)[number];
