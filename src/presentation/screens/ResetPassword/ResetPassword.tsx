import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { useResetPasswordController } from './useResetPasswordController';

export function ResetPassword() {
	const {
		email,
		control,
		apiErrorMessage,
		isResettingPassword,
		isRequestingRecoveryCode,
		handleResendCode,
		handleSubmit
	} = useResetPasswordController();

	return (
		<ScreenLayout className='justify-center gap-8'>
			<View className='gap-2'>
				<AppText color='strong' size='titleLg' weight='semibold'>
					Crie uma senha nova
				</AppText>

				<AppText color='muted'>
					Se houver uma conta para {email}, o código chegou por e-mail. Confira também a caixa de
					spam.
				</AppText>
			</View>

			<View className='gap-4'>
				<Input
					autoComplete='one-time-code'
					control={control}
					keyboardType='number-pad'
					label='Código'
					maxLength={32}
					name='code'
					placeholder='Código de 6 dígitos'
				/>

				<Input
					autoCapitalize='none'
					autoComplete='new-password'
					control={control}
					label='Nova senha'
					name='password'
					placeholder='Mínimo de 8 caracteres'
					secureTextEntry
				/>

				<Input
					autoCapitalize='none'
					autoComplete='new-password'
					control={control}
					label='Confirme a nova senha'
					name='passwordConfirmation'
					placeholder='Repita a nova senha'
					secureTextEntry
				/>

				{!!apiErrorMessage && (
					<AppText color='destructive' size='bodySm'>
						{apiErrorMessage}
					</AppText>
				)}
			</View>

			<View className='gap-3'>
				<Button isLoading={isResettingPassword} onPress={handleSubmit} title='Salvar nova senha' />

				<Button
					isLoading={isRequestingRecoveryCode}
					onPress={handleResendCode}
					title='Reenviar código'
					variant='ghost'
				/>
			</View>
		</ScreenLayout>
	);
}
