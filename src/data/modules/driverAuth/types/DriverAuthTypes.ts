import type { IAuthSession } from 'data/modules/auth/types/AuthTypes';
import type { IDriver } from 'shared/entities/IDriver';

export interface IDriverSessionResponse {
	user: IDriver;
	session: IAuthSession;
}
