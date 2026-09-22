import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { formatPrice } from 'shared/utils/formatPrice';
import type { IOrderItemsCardProps } from './OrderItemsCardTypes';

export function OrderItemsCard({ order }: IOrderItemsCardProps) {
	return (
		<View className='gap-3 rounded-xl border border-gray-200 bg-white p-4'>
			{order.items.map((item) => (
				<View className='flex-row items-start gap-3' key={item.id}>
					<AppText color='muted' size='bodySm' weight='semibold'>
						{item.quantity}x
					</AppText>

					<View className='flex-1 gap-0.5'>
						<AppText color='strong' size='bodySm'>
							{item.productName}
						</AppText>

						{!!item.notes && (
							<AppText color='subtle' size='label'>
								{item.notes}
							</AppText>
						)}
					</View>

					<AppText color='default' size='bodySm'>
						{formatPrice(item.totalCents)}
					</AppText>
				</View>
			))}

			<View className='gap-2 border-gray-200 border-t pt-3'>
				<View className='flex-row items-center justify-between'>
					<AppText color='muted' size='bodySm'>
						Subtotal
					</AppText>

					<AppText color='default' size='bodySm'>
						{formatPrice(order.subtotalCents)}
					</AppText>
				</View>

				<View className='flex-row items-center justify-between'>
					<AppText color='muted' size='bodySm'>
						Entrega
					</AppText>

					<AppText color='default' size='bodySm'>
						{order.deliveryFeeCents === 0 ? 'Grátis' : formatPrice(order.deliveryFeeCents)}
					</AppText>
				</View>

				<View className='flex-row items-center justify-between'>
					<AppText color='strong' size='bodyMd' weight='semibold'>
						Total
					</AppText>

					<AppText color='strong' size='bodyMd' weight='semibold'>
						{formatPrice(order.totalCents)}
					</AppText>
				</View>
			</View>
		</View>
	);
}
