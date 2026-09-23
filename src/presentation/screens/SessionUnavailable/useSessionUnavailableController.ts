import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { useState } from 'react';

export function useSessionUnavailableController() {
	const { retryRestoreSession, signOut } = useAuth();
	const [isRetrying, setIsRetrying] = useState(false);

	async function handleRetry() {
		setIsRetrying(true);

		try {
			await retryRestoreSession();
		} finally {
			setIsRetrying(false);
		}
	}

	async function handleSignOut() {
		await signOut();
	}

	return {
		isRetrying,
		handleRetry,
		handleSignOut
	};
}
