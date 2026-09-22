import type { ICustomer } from 'shared/entities/ICustomer';

export interface ISignInPayload {
	email: string;
	password: string;
}

export interface ISignUpPayload {
	name: string;
	email: string;
	password: string;
	phone?: string;
}

export interface IAuthSession {
	accessToken: string;
	idToken: string;
	refreshToken: string;
	expiresIn: number;
}

export interface IAuthSessionResponse {
	customer: ICustomer;
	session: IAuthSession;
}

export interface IRefreshTokenPayload {
	refreshToken: string;
}

export interface IRefreshTokenResponse {
	accessToken: string;
	idToken: string;
	expiresIn: number;
}
