import { useMutation } from '@tanstack/react-query';
import { AuthService } from 'data/modules/auth/services/AuthService';
import { AuthMutationKeys } from '../../keys/AuthKeys';

export function useSignIn() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [AuthMutationKeys.SIGN_IN],
		mutationFn: AuthService.signIn
	});

	return {
		signIn: mutateAsync,
		isSigningIn: isPending
	};
}
