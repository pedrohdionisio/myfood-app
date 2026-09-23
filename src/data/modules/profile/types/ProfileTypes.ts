import type { AuthProfile } from 'shared/constants/authProfiles';

export interface IUpdateProfilePayload {
	profile: AuthProfile;
	name: string;
	phone: string | null;
}

export interface IUpdatedProfile {
	name: string;
	phone: string | null;
}
