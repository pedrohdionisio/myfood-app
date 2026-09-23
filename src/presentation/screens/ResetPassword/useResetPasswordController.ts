import { zodResolver } from '@hookform/resolvers/zod';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApiErrorMessage } from 'data/config/apiError';
import { useRequestRecoveryCode } from 'data/modules/passwordRecovery/useCases/requestRecoveryCode/useRequestRecoveryCode';
import {
	type ResetPasswordFormType,
	type ResetPasswordPayloadType,
	resetPasswordSchema
} from 'data/modules/passwordRecovery/useCases/resetPassword/schemas/resetPasswordSchema';
import { useResetPassword } from 'data/modules/passwordRecovery/useCases/resetPassword/useResetPassword';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import type { AuthRoutesParamList } from 'shared/navigation/AppRoutesTypes';

export function useResetPasswordController() {
	const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList>>();
	const { params } = useRoute<RouteProp<AuthRoutesParamList, 'ResetPassword'>>();
	const { profile, email } = params;

	const { resetPassword, isResettingPassword } = useResetPassword();
	const { requestRecoveryCode, isRequestingRecoveryCode } = useRequestRecoveryCode();
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const { control, handleSubmit } = useForm<
		ResetPasswordFormType,
		unknown,
		ResetPasswordPayloadType
	>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: { code: '', password: '', passwordConfirmation: '' }
	});

	async function onSubmit(payload: ResetPasswordPayloadType) {
		setApiErrorMessage(null);

		try {
			const { message } = await resetPassword({ profile, email, ...payload });

			Alert.alert('Senha alterada', message);
			navigation.popTo('SignIn');
		} catch (error) {
			setApiErrorMessage(getApiErrorMessage(error));
		}
	}

	async function handleResendCode() {
		setApiErrorMessage(null);

		try {
			const { message } = await requestRecoveryCode({ profile, email });

			Alert.alert('Código reenviado', message);
		} catch (error) {
			setApiErrorMessage(getApiErrorMessage(error));
		}
	}

	return {
		email,
		control,
		apiErrorMessage,
		isResettingPassword,
		isRequestingRecoveryCode,
		handleResendCode,
		handleSubmit: handleSubmit(onSubmit)
	};
}
