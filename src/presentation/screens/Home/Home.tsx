import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { useHomeController } from './useHomeController';

export function Home() {
	const { customerName, handleSignOut } = useHomeController();

	return (
		<ScreenLayout className='justify-between'>
			<View className='gap-2'>
				<AppText color='brand' size='eyebrow' weight='medium'>
					MyFood
				</AppText>

				<AppText color='strong' size='titleLg' weight='semibold'>
					Olá, {customerName}
				</AppText>

				<AppText color='muted'>Sua sessão está ativa e persistida no device.</AppText>
			</View>

			<Button onPress={handleSignOut} title='Sair' variant='outline' />
		</ScreenLayout>
	);
}
