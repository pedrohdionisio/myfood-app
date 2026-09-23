import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import type { IDeliveriesHeaderProps } from './DeliveriesHeaderTypes';

export function DeliveriesHeader({ driverName, onSignOut }: IDeliveriesHeaderProps) {
	return (
		<View className='mb-4 flex-row items-start justify-between gap-4'>
			<View className='flex-1 gap-1'>
				<AppText color='strong' size='titleMd' weight='semibold'>
					Minhas entregas
				</AppText>

				<AppText color='muted' numberOfLines={1} size='bodySm'>
					{driverName}
				</AppText>
			</View>

			<Pressable
				accessibilityRole='button'
				className='active:opacity-80'
				hitSlop={12}
				onPress={onSignOut}
			>
				<AppText color='brand' size='bodySm' weight='medium'>
					Sair
				</AppText>
			</Pressable>
		</View>
	);
}
