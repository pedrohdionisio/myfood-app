import { api } from 'data/config/api';
import type {
	IRegisterPushTokenPayload,
	IUnregisterPushTokenPayload
} from 'data/modules/pushToken/types/PushTokenTypes';
import type { AuthProfile } from 'shared/constants/authProfiles';

const PUSH_TOKENS_PATH_BY_PROFILE: Record<AuthProfile, string> = {
	customer: '/me/push-tokens',
	driver: '/restaurant-users/me/push-tokens'
};

const UNREGISTER_TIMEOUT_MS = 5000;

async function register({ profile, ...body }: IRegisterPushTokenPayload): Promise<void> {
	await api.post(PUSH_TOKENS_PATH_BY_PROFILE[profile], body);
}

async function unregister({ profile, token }: IUnregisterPushTokenPayload): Promise<void> {
	await api.delete(PUSH_TOKENS_PATH_BY_PROFILE[profile], {
		data: { token },
		timeout: UNREGISTER_TIMEOUT_MS
	});
}

export const PushTokenService = {
	register,
	unregister
};
