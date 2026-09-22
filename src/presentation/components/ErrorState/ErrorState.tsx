import { TriangleAlertIcon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IErrorStateProps } from './ErrorStateTypes';

export function ErrorState({ message, actionTitle, onAction }: IErrorStateProps) {
	return (
		<View className='items-center gap-4 px-6 py-12'>
			<TriangleAlertIcon color={COLORS.gray[400]} size={32} strokeWidth={1.8} />

			<AppText align='center' color='muted'>
				{message}
			</AppText>

			{!!actionTitle && !!onAction && (
				<Button onPress={onAction} size='md' title={actionTitle} variant='outline' />
			)}
		</View>
	);
}
