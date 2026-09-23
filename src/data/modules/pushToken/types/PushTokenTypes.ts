import type { AuthProfile } from 'shared/constants/authProfiles';
import type { DevicePlatform } from 'shared/constants/devicePlatforms';

export interface IRegisterPushTokenPayload {
	profile: AuthProfile;
	token: string;
	platform: DevicePlatform;
}

export interface IUnregisterPushTokenPayload {
	profile: AuthProfile;
	token: string;
}
