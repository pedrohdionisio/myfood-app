import { useMutation } from '@tanstack/react-query';
import { AuthService } from 'data/modules/auth/services/AuthService';
import { AUTH_MUTATION_KEYS } from '../../keys/AuthKeys';

export function useSignUp() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [AUTH_MUTATION_KEYS.SIGN_UP],
		mutationFn: AuthService.signUp
	});

	return {
		signUp: mutateAsync,
		isSigningUp: isPending
	};
}
