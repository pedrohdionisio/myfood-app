import { useMutation } from '@tanstack/react-query';
import { PROFILE_MUTATION_KEYS } from 'data/modules/profile/keys/ProfileKeys';
import { ProfileService } from 'data/modules/profile/services/ProfileService';

export function useUpdateProfile() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [PROFILE_MUTATION_KEYS.UPDATE_PROFILE],
		mutationFn: ProfileService.update
	});

	return {
		updateProfile: mutateAsync,
		isUpdatingProfile: isPending
	};
}
