import * as SecureStore from 'expo-secure-store';
import { AUTH_PROFILES, type AuthProfile } from 'shared/constants/authProfiles';
import {
	ACCESS_TOKEN_STORAGE_KEY,
	AUTH_PROFILE_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY
} from 'shared/constants/storageKeys';

export interface IAuthTokens {
	profile: AuthProfile;
	accessToken: string;
	refreshToken: string;
}

function isAuthProfile(value: string): value is AuthProfile {
	return AUTH_PROFILES.some((profile) => profile === value);
}

async function save(tokens: IAuthTokens) {
	await Promise.all([
		SecureStore.setItemAsync(AUTH_PROFILE_STORAGE_KEY, tokens.profile),
		SecureStore.setItemAsync(ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken),
		SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken)
	]);
}

async function load(): Promise<IAuthTokens | null> {
	const [profile, accessToken, refreshToken] = await Promise.all([
		SecureStore.getItemAsync(AUTH_PROFILE_STORAGE_KEY),
		SecureStore.getItemAsync(ACCESS_TOKEN_STORAGE_KEY),
		SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY)
	]);

	if (!profile || !isAuthProfile(profile) || !accessToken || !refreshToken) {
		return null;
	}

	return { profile, accessToken, refreshToken };
}

async function clear() {
	await Promise.all([
		SecureStore.deleteItemAsync(AUTH_PROFILE_STORAGE_KEY),
		SecureStore.deleteItemAsync(ACCESS_TOKEN_STORAGE_KEY),
		SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY)
	]);
}

export const AuthTokensManager = {
	save,
	load,
	clear
};
