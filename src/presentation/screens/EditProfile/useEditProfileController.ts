import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import {
	type UpdateProfileFormType,
	type UpdateProfilePayloadType,
	updateProfileSchema
} from 'data/modules/profile/useCases/updateProfile/schemas/updateProfileSchema';
import { useUpdateProfile } from 'data/modules/profile/useCases/updateProfile/useUpdateProfile';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { maskPhone } from 'shared/utils/maskPhone';

export function useEditProfileController() {
	const navigation = useNavigation();
	const { profile, customer, driver, applyUpdatedProfile } = useAuth();
	const { updateProfile, isUpdatingProfile } = useUpdateProfile();
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const signedInUser = customer ?? driver;

	const { control, handleSubmit } = useForm<
		UpdateProfileFormType,
		unknown,
		UpdateProfilePayloadType
	>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			name: signedInUser?.name ?? '',
			phone: maskPhone(signedInUser?.phone ?? '')
		}
	});

	async function onSubmit(payload: UpdateProfilePayloadType) {
		if (!profile) {
			return;
		}

		setApiErrorMessage(null);

		try {
			applyUpdatedProfile(await updateProfile({ profile, ...payload }));
			navigation.goBack();
		} catch (error) {
			setApiErrorMessage(getApiErrorMessage(error));
		}
	}

	function handleGoBack() {
		navigation.goBack();
	}

	return {
		control,
		email: signedInUser?.email ?? '',
		apiErrorMessage,
		isUpdatingProfile,
		handleSubmit: handleSubmit(onSubmit),
		handleGoBack
	};
}
