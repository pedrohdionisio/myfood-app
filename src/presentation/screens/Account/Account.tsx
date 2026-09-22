import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { useAccountController } from './useAccountController';

export function Account() {
	const { customerName, customerEmail, handleGoToAddresses, handleSignOut } =
		useAccountController();

	return (
		<ScreenLayout className='gap-8'>
			<View className='gap-1'>
				<AppText color='strong' size='titleMd' weight='semibold'>
					{customerName}
				</AppText>

				<AppText color='muted' size='bodySm'>
					{customerEmail}
				</AppText>
			</View>

			<View className='gap-3'>
				<Button onPress={handleGoToAddresses} title='Meus endereços' variant='outline' />

				<Button onPress={handleSignOut} title='Sair' variant='ghost' />
			</View>
		</ScreenLayout>
	);
}
