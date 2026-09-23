import type { AuthProfile } from 'shared/constants/authProfiles';

export interface ISignInFormProps {
	profile: AuthProfile;
}

export interface IUseSignInFormControllerParams {
	profile: AuthProfile;
}
