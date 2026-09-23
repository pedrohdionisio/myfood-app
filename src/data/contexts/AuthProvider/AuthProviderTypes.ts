import type { IAuthSessionResponse } from 'data/modules/auth/types/AuthTypes';
import type { IDriverSessionResponse } from 'data/modules/driverAuth/types/DriverAuthTypes';
import type { AuthProfile } from 'shared/constants/authProfiles';
import type { ICustomer } from 'shared/entities/ICustomer';
import type { IDriver } from 'shared/entities/IDriver';

export type SignedInUser =
	| { profile: 'customer'; customer: ICustomer }
	| { profile: 'driver'; driver: IDriver };

export interface IAuthContextValue {
	profile: AuthProfile | null;
	customer: ICustomer | null;
	driver: IDriver | null;
	signedIn: boolean;
	startCustomerSession: (response: IAuthSessionResponse) => Promise<void>;
	startDriverSession: (response: IDriverSessionResponse) => Promise<void>;
	signOut: () => Promise<void>;
}
