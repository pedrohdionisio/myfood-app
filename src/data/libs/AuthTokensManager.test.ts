import * as SecureStore from 'expo-secure-store';
import { AUTH_PROFILE_STORAGE_KEY } from 'shared/constants/storageKeys';
import { AuthTokensManager } from './AuthTokensManager';

const tokens = {
	profile: 'driver',
	accessToken: 'access-token',
	refreshToken: 'refresh-token'
} as const;

describe('AuthTokensManager', () => {
	it('should load the tokens it saved', async () => {
		await AuthTokensManager.save(tokens);

		await expect(AuthTokensManager.load()).resolves.toEqual(tokens);
	});

	it('should load nothing after clearing', async () => {
		await AuthTokensManager.save(tokens);
		await AuthTokensManager.clear();

		await expect(AuthTokensManager.load()).resolves.toBeNull();
	});

	it('should ignore a stored profile it does not know', async () => {
		await AuthTokensManager.save(tokens);
		await SecureStore.setItemAsync(AUTH_PROFILE_STORAGE_KEY, 'admin');

		await expect(AuthTokensManager.load()).resolves.toBeNull();
	});
});
