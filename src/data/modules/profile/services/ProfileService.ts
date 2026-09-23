import { api } from 'data/config/api';
import type {
	IUpdatedProfile,
	IUpdateProfilePayload
} from 'data/modules/profile/types/ProfileTypes';
import type { AuthProfile } from 'shared/constants/authProfiles';

const PROFILE_PATH_BY_PROFILE: Record<AuthProfile, string> = {
	customer: '/customers/me',
	driver: '/restaurant-users/me'
};

async function update({ profile, ...body }: IUpdateProfilePayload): Promise<IUpdatedProfile> {
	const { data } = await api.patch<IUpdatedProfile>(PROFILE_PATH_BY_PROFILE[profile], body);

	return data;
}

export const ProfileService = {
	update
};
