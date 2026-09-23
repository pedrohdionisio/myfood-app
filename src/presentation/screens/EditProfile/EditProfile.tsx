import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { maskPhone } from 'shared/utils/maskPhone';
import { useEditProfileController } from './useEditProfileController';

export function EditProfile() {
	const { control, email, apiErrorMessage, isUpdatingProfile, handleSubmit, handleGoBack } =
		useEditProfileController();

	return (
		<ScreenLayout className='gap-6'>
			<ScreenHeader onBack={handleGoBack} title='Editar perfil' />

			<View className='gap-4'>
				<Input
					autoComplete='name'
					control={control}
					label='Nome'
					name='name'
					placeholder='Como podemos te chamar'
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

				<View className='gap-1'>
					<AppText color='muted' size='label' weight='medium'>
						E-mail
					</AppText>

					<AppText color='default' size='bodyMd'>
						{email}
					</AppText>

					<AppText color='muted' size='bodySm'>
						O e-mail é o seu login e não pode ser alterado por aqui.
					</AppText>
				</View>

				{!!apiErrorMessage && (
					<AppText color='destructive' size='bodySm'>
						{apiErrorMessage}
					</AppText>
				)}
			</View>

			<Button isLoading={isUpdatingProfile} onPress={handleSubmit} title='Salvar' />
		</ScreenLayout>
	);
}
