import * as SecureStore from 'expo-secure-store';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from 'shared/constants/storageKeys';

export interface IAuthTokens {
	accessToken: string;
	refreshToken: string;
}

async function save(tokens: IAuthTokens) {
	await Promise.all([
		SecureStore.setItemAsync(ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken),
		SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken)
	]);
}

async function load(): Promise<IAuthTokens | null> {
	const [accessToken, refreshToken] = await Promise.all([
		SecureStore.getItemAsync(ACCESS_TOKEN_STORAGE_KEY),
		SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY)
	]);

	if (!accessToken || !refreshToken) {
		return null;
	}

	return { accessToken, refreshToken };
}

async function clear() {
	await Promise.all([
		SecureStore.deleteItemAsync(ACCESS_TOKEN_STORAGE_KEY),
		SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY)
	]);
}

export const AuthTokensManager = {
	save,
	load,
	clear
};
