import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { useSessionUnavailableController } from './useSessionUnavailableController';

export function SessionUnavailable() {
	const { isRetrying, handleRetry, handleSignOut } = useSessionUnavailableController();

	return (
		<ScreenLayout className='justify-center gap-8'>
			<View className='gap-2'>
				<AppText color='strong' size='titleLg' weight='semibold'>
					Não foi possível conectar
				</AppText>

				<AppText color='muted'>
					Sua sessão continua salva. Verifique a conexão com a internet e tente de novo.
				</AppText>
			</View>

			<View className='gap-3'>
				<Button isLoading={isRetrying} onPress={handleRetry} title='Tentar de novo' />

				<Button onPress={handleSignOut} title='Sair da conta' variant='ghost' />
			</View>
		</ScreenLayout>
	);
}
