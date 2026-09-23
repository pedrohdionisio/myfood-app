import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { View } from 'react-native';
import type { ISignInFormProps } from './SignInFormTypes';
import { useSignInFormController } from './useSignInFormController';

export function SignInForm({ profile }: ISignInFormProps) {
	const { control, apiErrorMessage, isSigningIn, handleSubmit } = useSignInFormController({
		profile
	});

	return (
		<View className='mt-6 gap-6'>
			<Input
				autoCapitalize='none'
				autoComplete='email'
				control={control}
				keyboardType='email-address'
				label='E-mail'
				name='email'
				placeholder='Seu e-mail'
			/>

			<Input
				autoCapitalize='none'
				autoComplete='current-password'
				control={control}
				label='Senha'
				name='password'
				placeholder='Informe sua senha'
				secureTextEntry
			/>

			{!!apiErrorMessage && (
				<AppText color='destructive' size='bodySm'>
					{apiErrorMessage}
				</AppText>
			)}

			<Button className='mt-2' isLoading={isSigningIn} onPress={handleSubmit} title='Entrar' />
		</View>
	);
}
