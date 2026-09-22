import type { IAuthSessionResponse } from 'data/modules/auth/types/AuthTypes';
import type { ICustomer } from 'shared/entities/ICustomer';

export interface IAuthContextValue {
	customer: ICustomer | null;
	signedIn: boolean;
	startSession: (response: IAuthSessionResponse) => Promise<void>;
	signOut: () => Promise<void>;
}
