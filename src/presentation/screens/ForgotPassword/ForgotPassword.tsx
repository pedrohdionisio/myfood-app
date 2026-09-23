import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { useForgotPasswordController } from './useForgotPasswordController';

export function ForgotPassword() {
	const { control, apiErrorMessage, isRequestingRecoveryCode, handleSubmit, handleGoBack } =
		useForgotPasswordController();

	return (
		<ScreenLayout className='justify-center gap-8'>
			<View className='gap-2'>
				<AppText color='strong' size='titleLg' weight='semibold'>
					Esqueceu a senha?
				</AppText>

				<AppText color='muted'>
					Informe o e-mail da sua conta e enviaremos um código para você criar uma senha nova.
				</AppText>
			</View>

			<View className='gap-4'>
				<Input
					autoCapitalize='none'
					autoComplete='email'
					control={control}
					keyboardType='email-address'
					label='E-mail'
					name='email'
					placeholder='voce@email.com'
				/>

				{!!apiErrorMessage && (
					<AppText color='destructive' size='bodySm'>
						{apiErrorMessage}
					</AppText>
				)}
			</View>

			<View className='gap-3'>
				<Button isLoading={isRequestingRecoveryCode} onPress={handleSubmit} title='Enviar código' />

				<Button onPress={handleGoBack} title='Voltar para o login' variant='ghost' />
			</View>
		</ScreenLayout>
	);
}
