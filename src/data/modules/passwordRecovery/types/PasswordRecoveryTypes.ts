import type { AuthProfile } from 'shared/constants/authProfiles';

export interface IRequestRecoveryCodePayload {
	profile: AuthProfile;
	email: string;
}

export interface IResetPasswordPayload {
	profile: AuthProfile;
	email: string;
	code: string;
	password: string;
}

export interface IPasswordRecoveryResponse {
	message: string;
}
