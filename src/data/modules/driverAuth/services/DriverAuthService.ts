import { api, publicApi } from 'data/config/api';
import type {
	IRefreshTokenPayload,
	IRefreshTokenResponse,
	ISignInPayload
} from 'data/modules/auth/types/AuthTypes';
import type { IDriverSessionResponse } from 'data/modules/driverAuth/types/DriverAuthTypes';
import type { IDriver } from 'shared/entities/IDriver';

async function signIn(payload: ISignInPayload): Promise<IDriverSessionResponse> {
	const { data } = await publicApi.post<IDriverSessionResponse>(
		'/auth/restaurant-users/sign-in',
		payload
	);

	return data;
}

async function refreshToken(payload: IRefreshTokenPayload): Promise<IRefreshTokenResponse> {
	const { data } = await publicApi.post<IRefreshTokenResponse>(
		'/auth/restaurant-users/refresh',
		payload
	);

	return data;
}

async function getMe(): Promise<IDriver> {
	const { data } = await api.get<IDriver>('/restaurant-users/me');

	return data;
}

export const DriverAuthService = {
	signIn,
	refreshToken,
	getMe
};
