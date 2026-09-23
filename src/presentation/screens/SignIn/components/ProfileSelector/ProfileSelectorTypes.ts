import type { AuthProfile } from 'shared/constants/authProfiles';

export interface IProfileSelectorProps {
	selectedProfile: AuthProfile;
	onSelect: (profile: AuthProfile) => void;
}
