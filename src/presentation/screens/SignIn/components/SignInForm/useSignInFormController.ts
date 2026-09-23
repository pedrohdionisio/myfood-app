import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import {
	type SignInFormType,
	signInSchema
} from 'data/modules/auth/useCases/signIn/schemas/signInSchema';
import { useSignIn } from 'data/modules/auth/useCases/signIn/useSignIn';
import { useDriverSignIn } from 'data/modules/driverAuth/useCases/signIn/useDriverSignIn';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { IUseSignInFormControllerParams } from './SignInFormTypes';

export function useSignInFormController({ profile }: IUseSignInFormControllerParams) {
	const { startCustomerSession, startDriverSession } = useAuth();
	const { signIn, isSigningIn } = useSignIn();
	const { driverSignIn, isDriverSigningIn } = useDriverSignIn();
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const { control, handleSubmit } = useForm<SignInFormType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	async function onSubmit(formData: SignInFormType) {
		setApiErrorMessage(null);

		try {
			if (profile === 'driver') {
				await startDriverSession(await driverSignIn(formData));

				return;
			}

			await startCustomerSession(await signIn(formData));
		} catch (error) {
			setApiErrorMessage(getApiErrorMessage(error));
		}
	}

	return {
		control,
		apiErrorMessage,
		isSigningIn: isSigningIn || isDriverSigningIn,
		handleSubmit: handleSubmit(onSubmit)
	};
}
