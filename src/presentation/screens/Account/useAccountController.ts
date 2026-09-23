import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';

export function useAccountController() {
	const navigation = useNavigation();
	const { customer, signOut } = useAuth();

	function handleGoToAddresses() {
		navigation.navigate('Addresses');
	}

	function handleGoToEditProfile() {
		navigation.navigate('EditProfile');
	}

	async function handleSignOut() {
		await signOut();
	}

	return {
		customerName: customer?.name ?? '',
		customerEmail: customer?.email ?? '',
		handleGoToAddresses,
		handleGoToEditProfile,
		handleSignOut
	};
}
