import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import type { IAppErrorProps } from './AppErrorTypes';
import { useAppErrorController } from './useAppErrorController';

export function AppError({ resetErrorBoundary }: IAppErrorProps) {
	useAppErrorController();

	return (
		<ScreenLayout className='justify-center gap-8'>
			<View className='gap-2'>
				<AppText color='strong' size='titleLg' weight='semibold'>
					Algo deu errado
				</AppText>

				<AppText color='muted'>
					O app encontrou um erro inesperado. Tente de novo; se continuar, feche e abra o app.
				</AppText>
			</View>

			<Button onPress={resetErrorBoundary} title='Tentar de novo' />
		</ScreenLayout>
	);
}
