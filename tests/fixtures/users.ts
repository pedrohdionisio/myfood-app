import type { IAuthSessionResponse } from 'data/modules/auth/types/AuthTypes';
import type { ICustomer } from 'shared/entities/ICustomer';
import type { IDriver } from 'shared/entities/IDriver';

export function buildCustomer(overrides: Partial<ICustomer> = {}): ICustomer {
	return {
		id: 'customer-1',
		name: 'Ana Souza',
		email: 'ana@myfood.test',
		phone: '11987654321',
		...overrides
	};
}

export function buildDriver(overrides: Partial<IDriver> = {}): IDriver {
	return {
		id: 'driver-1',
		name: 'Bruno Lima',
		email: 'bruno@myfood.test',
		phone: '11912345678',
		...overrides
	};
}

export function buildSession(): IAuthSessionResponse['session'] {
	return {
		accessToken: 'access-token',
		idToken: 'id-token',
		refreshToken: 'refresh-token',
		expiresIn: 3600
	};
}
