import { useMutation } from '@tanstack/react-query';
import { AuthService } from 'data/modules/auth/services/AuthService';
import { AUTH_MUTATION_KEYS } from '../../keys/AuthKeys';

export function useSignIn() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [AUTH_MUTATION_KEYS.SIGN_IN],
		mutationFn: AuthService.signIn
	});

	return {
		signIn: mutateAsync,
		isSigningIn: isPending
	};
}
