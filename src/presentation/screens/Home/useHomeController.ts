import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';

export function useHomeController() {
	const { customer, signOut } = useAuth();

	async function handleSignOut() {
		await signOut();
	}

	return {
		customerName: customer?.name ?? '',
		handleSignOut
	};
}
