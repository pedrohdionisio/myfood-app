import { zodResolver } from '@hookform/resolvers/zod';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import {
	type RequestRecoveryCodeFormType,
	requestRecoveryCodeSchema
} from 'data/modules/passwordRecovery/useCases/requestRecoveryCode/schemas/requestRecoveryCodeSchema';
import { useRequestRecoveryCode } from 'data/modules/passwordRecovery/useCases/requestRecoveryCode/useRequestRecoveryCode';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AuthRoutesParamList } from 'shared/navigation/AppRoutesTypes';

export function useForgotPasswordController() {
	const navigation = useNavigation();
	const { params } = useRoute<RouteProp<AuthRoutesParamList, 'ForgotPassword'>>();
	const { profile } = params;

	const { requestRecoveryCode, isRequestingRecoveryCode } = useRequestRecoveryCode();
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const { control, handleSubmit } = useForm<RequestRecoveryCodeFormType>({
		resolver: zodResolver(requestRecoveryCodeSchema),
		defaultValues: { email: '' }
	});

	async function onSubmit({ email }: RequestRecoveryCodeFormType) {
		setApiErrorMessage(null);

		try {
			await requestRecoveryCode({ profile, email });
			navigation.navigate('ResetPassword', { profile, email });
		} catch (error) {
			setApiErrorMessage(getApiErrorMessage(error));
		}
	}

	function handleGoBack() {
		navigation.goBack();
	}

	return {
		control,
		apiErrorMessage,
		isRequestingRecoveryCode,
		handleSubmit: handleSubmit(onSubmit),
		handleGoBack
	};
}
