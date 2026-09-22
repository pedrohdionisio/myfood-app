import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { View } from 'react-native';
import type { IEmptyStateProps } from './EmptyStateTypes';

export function EmptyState({ title, description, actionTitle, onAction }: IEmptyStateProps) {
	return (
		<View className='items-center gap-3 px-6 py-12'>
			<AppText align='center' color='strong' size='titleSm' weight='semibold'>
				{title}
			</AppText>

			{!!description && (
				<AppText align='center' color='muted' size='bodySm'>
					{description}
				</AppText>
			)}

			{!!actionTitle && !!onAction && (
				<Button className='mt-2' onPress={onAction} size='md' title={actionTitle} />
			)}
		</View>
	);
}
