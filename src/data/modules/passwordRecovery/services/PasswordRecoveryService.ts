import { publicApi } from 'data/config/api';
import type {
	IPasswordRecoveryResponse,
	IRequestRecoveryCodePayload,
	IResetPasswordPayload
} from 'data/modules/passwordRecovery/types/PasswordRecoveryTypes';
import type { AuthProfile } from 'shared/constants/authProfiles';

const AUTH_PATH_BY_PROFILE: Record<AuthProfile, string> = {
	customer: '/auth/customers',
	driver: '/auth/restaurant-users'
};

async function requestCode({
	profile,
	email
}: IRequestRecoveryCodePayload): Promise<IPasswordRecoveryResponse> {
	const { data } = await publicApi.post<IPasswordRecoveryResponse>(
		`${AUTH_PATH_BY_PROFILE[profile]}/forgot-password`,
		{ email }
	);

	return data;
}

async function reset({
	profile,
	...body
}: IResetPasswordPayload): Promise<IPasswordRecoveryResponse> {
	const { data } = await publicApi.post<IPasswordRecoveryResponse>(
		`${AUTH_PATH_BY_PROFILE[profile]}/reset-password`,
		body
	);

	return data;
}

export const PasswordRecoveryService = {
	requestCode,
	reset
};
