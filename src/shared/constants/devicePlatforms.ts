const DEVICE_PLATFORMS = ['IOS', 'ANDROID'] as const;

export type DevicePlatform = (typeof DEVICE_PLATFORMS)[number];
