import { useMutation } from '@tanstack/react-query';
import { PASSWORD_RECOVERY_MUTATION_KEYS } from 'data/modules/passwordRecovery/keys/PasswordRecoveryKeys';
import { PasswordRecoveryService } from 'data/modules/passwordRecovery/services/PasswordRecoveryService';

export function useRequestRecoveryCode() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [PASSWORD_RECOVERY_MUTATION_KEYS.REQUEST_RECOVERY_CODE],
		mutationFn: PasswordRecoveryService.requestCode
	});

	return {
		requestRecoveryCode: mutateAsync,
		isRequestingRecoveryCode: isPending
	};
}
