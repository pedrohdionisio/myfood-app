import { api, publicApi } from 'data/config/api';
import type {
	IAuthSessionResponse,
	IRefreshTokenPayload,
	IRefreshTokenResponse,
	ISignInPayload,
	ISignUpPayload
} from 'data/modules/auth/types/AuthTypes';
import type { ICustomer } from 'shared/entities/ICustomer';

async function signIn(payload: ISignInPayload): Promise<IAuthSessionResponse> {
	const { data } = await publicApi.post<IAuthSessionResponse>('/auth/customers/sign-in', payload);

	return data;
}

async function signUp(payload: ISignUpPayload): Promise<IAuthSessionResponse> {
	const { data } = await publicApi.post<IAuthSessionResponse>('/auth/customers/sign-up', payload);

	return data;
}

async function refreshToken(payload: IRefreshTokenPayload): Promise<IRefreshTokenResponse> {
	const { data } = await publicApi.post<IRefreshTokenResponse>('/auth/customers/refresh', payload);

	return data;
}

async function getMe(): Promise<ICustomer> {
	const { data } = await api.get<ICustomer>('/customers/me');

	return data;
}

export const AuthService = {
	signIn,
	signUp,
	refreshToken,
	getMe
};
