import { useMutation } from '@tanstack/react-query';
import { PASSWORD_RECOVERY_MUTATION_KEYS } from 'data/modules/passwordRecovery/keys/PasswordRecoveryKeys';
import { PasswordRecoveryService } from 'data/modules/passwordRecovery/services/PasswordRecoveryService';

export function useResetPassword() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [PASSWORD_RECOVERY_MUTATION_KEYS.RESET_PASSWORD],
		mutationFn: PasswordRecoveryService.reset
	});

	return {
		resetPassword: mutateAsync,
		isResettingPassword: isPending
	};
}
