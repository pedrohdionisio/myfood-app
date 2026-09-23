import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { PAYMENT_METHOD_LABELS } from 'shared/constants/orders';
import { formatDeliveryAddress } from 'shared/utils/formatDeliveryAddress';
import { formatPrice } from 'shared/utils/formatPrice';
import type { IDeliveryCardProps } from './DeliveryCardTypes';

export function DeliveryCard({ delivery, onPress }: IDeliveryCardProps) {
	return (
		<Pressable
			accessibilityLabel={`Abrir entrega do pedido ${delivery.displayNumber}`}
			accessibilityRole='button'
			className='gap-1 rounded-xl border border-gray-200 bg-white p-4 active:opacity-80'
			onPress={onPress}
		>
			<View className='flex-row items-center justify-between gap-3'>
				<AppText color='strong' numberOfLines={1} size='bodyMd' weight='semibold'>
					{delivery.customerName}
				</AppText>

				<AppText color='muted' size='label' weight='medium'>
					#{delivery.displayNumber}
				</AppText>
			</View>

			<AppText color='muted' numberOfLines={2} size='bodySm'>
				{formatDeliveryAddress(delivery)}
			</AppText>

			<AppText color='muted' size='bodySm'>
				{delivery.restaurantTradeName} · {PAYMENT_METHOD_LABELS[delivery.paymentMethod]}
				{delivery.totalCents !== null && ` · ${formatPrice(delivery.totalCents)}`}
			</AppText>
		</Pressable>
	);
}
