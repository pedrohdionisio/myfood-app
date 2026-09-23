import { AppImage } from 'presentation/components/AppImage/AppImage';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { ORDER_STATUS_LABELS } from 'shared/constants/orders';
import { formatDateTime } from 'shared/utils/formatDateTime';
import { formatPrice } from 'shared/utils/formatPrice';
import { isFinishedOrder } from 'shared/utils/isFinishedOrder';
import type { IOrderCardProps } from './OrderCardTypes';

export function OrderCard({ order, onPress }: IOrderCardProps) {
	const isFinished = isFinishedOrder(order.status);

	return (
		<Pressable
			accessibilityLabel={`Abrir pedido ${order.displayNumber}`}
			accessibilityRole='button'
			className='flex-row items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 active:opacity-80'
			onPress={onPress}
		>
			<AppImage
				className='h-14 w-14 rounded-lg bg-gray-100'
				fallbackIconSize={20}
				source={order.restaurant.logoUrls?.sm}
			/>

			<View className='flex-1 gap-1'>
				<AppText color='strong' numberOfLines={1} size='bodyMd' weight='semibold'>
					{order.restaurant.tradeName}
				</AppText>

				<AppText color={isFinished ? 'muted' : 'brand'} size='bodySm' weight='medium'>
					{ORDER_STATUS_LABELS[order.status]}
				</AppText>

				<AppText color='subtle' size='bodySm'>
					#{order.displayNumber} · {order.itemCount} {order.itemCount === 1 ? 'item' : 'itens'} ·{' '}
					{formatPrice(order.totalCents)}
				</AppText>

				<AppText color='subtle' size='label'>
					{formatDateTime(order.createdAt)}
				</AppText>

				{order.status === 'DELIVERED' && !order.hasReview && (
					<AppText color='brand' size='label' weight='semibold'>
						Avaliar pedido
					</AppText>
				)}
			</View>
		</Pressable>
	);
}
