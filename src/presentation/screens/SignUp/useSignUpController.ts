import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import {
	type SignUpFormType,
	type SignUpPayloadType,
	signUpSchema
} from 'data/modules/auth/useCases/signUp/schemas/signUpSchema';
import { useSignUp } from 'data/modules/auth/useCases/signUp/useSignUp';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function useSignUpController() {
	const navigation = useNavigation();
	const { startCustomerSession } = useAuth();
	const { signUp, isSigningUp } = useSignUp();
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const { control, handleSubmit } = useForm<SignUpFormType, unknown, SignUpPayloadType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			password: ''
		}
	});

	async function onSubmit(formData: SignUpPayloadType) {
		setApiErrorMessage(null);

		try {
			const response = await signUp(formData);

			await startCustomerSession(response);
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
		isSigningUp,
		handleSubmit: handleSubmit(onSubmit),
		handleGoBack
	};
}
