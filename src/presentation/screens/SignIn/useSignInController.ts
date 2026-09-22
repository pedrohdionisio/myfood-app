import { useNavigation } from '@react-navigation/native';

export function useSignInController() {
	const navigation = useNavigation();

	function handleGoToSignUp() {
		navigation.navigate('SignUp');
	}

	return {
		handleGoToSignUp
	};
}
