import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { PasswordInput } from 'presentation/components/PasswordInput/PasswordInput';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { maskPhone } from 'shared/utils/maskPhone';
import { useSignUpController } from './useSignUpController';

export function SignUp() {
	const { control, apiErrorMessage, isSigningUp, handleSubmit, handleGoBack } =
		useSignUpController();

	return (
		<ScreenLayout className='justify-center gap-8'>
			<View className='gap-2'>
				<AppText color='strong' size='titleLg' weight='semibold'>
					Criar sua conta
				</AppText>

				<AppText color='muted'>É rápido — só precisamos de alguns dados.</AppText>
			</View>

			<View className='gap-4'>
				<Input
					autoComplete='name'
					control={control}
					label='Nome'
					name='name'
					placeholder='Como podemos te chamar'
				/>

				<Input
					autoCapitalize='none'
					autoComplete='email'
					control={control}
					keyboardType='email-address'
					label='E-mail'
					name='email'
					placeholder='voce@email.com'
				/>

				<Input
					autoComplete='tel'
					control={control}
					keyboardType='phone-pad'
					label='Telefone (opcional)'
					mask={maskPhone}
					name='phone'
					placeholder='DDD + número'
				/>

				<PasswordInput
					autoComplete='new-password'
					control={control}
					label='Senha'
					name='password'
					placeholder='Mínimo de 8 caracteres'
				/>

				{!!apiErrorMessage && (
					<AppText color='destructive' size='bodySm'>
						{apiErrorMessage}
					</AppText>
				)}
			</View>

			<View className='gap-3'>
				<Button isLoading={isSigningUp} onPress={handleSubmit} title='Criar conta' />

				<Button onPress={handleGoBack} title='Já tenho conta' variant='ghost' />
			</View>
		</ScreenLayout>
	);
}
