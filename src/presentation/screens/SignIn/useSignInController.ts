import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import type { AuthProfile } from 'shared/constants/authProfiles';
import type { IHandleSelectProfileParams } from './SignInTypes';

export function useSignInController() {
	const navigation = useNavigation();
	const [profile, setProfile] = useState<AuthProfile>('customer');

	function handleSelectProfile({ profile: selectedProfile }: IHandleSelectProfileParams) {
		setProfile(selectedProfile);
	}

	function handleGoToSignUp() {
		navigation.navigate('SignUp');
	}

	return {
		profile,
		shouldShowSignUp: profile === 'customer',
		handleSelectProfile,
		handleGoToSignUp
	};
}
