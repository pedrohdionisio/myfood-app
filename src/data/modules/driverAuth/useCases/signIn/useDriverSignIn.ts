import { useMutation } from '@tanstack/react-query';
import { DRIVER_AUTH_MUTATION_KEYS } from 'data/modules/driverAuth/keys/DriverAuthKeys';
import { DriverAuthService } from 'data/modules/driverAuth/services/DriverAuthService';

export function useDriverSignIn() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [DRIVER_AUTH_MUTATION_KEYS.SIGN_IN],
		mutationFn: DriverAuthService.signIn
	});

	return {
		driverSignIn: mutateAsync,
		isDriverSigningIn: isPending
	};
}
