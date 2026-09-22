import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from 'shared/constants/orders';
import { formatDateTime } from 'shared/utils/formatDateTime';
import type { IOrderStatusCardProps } from './OrderStatusCardTypes';

export function OrderStatusCard({ order }: IOrderStatusCardProps) {
	return (
		<View className='gap-2 rounded-xl border border-gray-200 bg-white p-4'>
			<AppText color='muted' size='label' weight='medium'>
				Pedido #{order.displayNumber}
			</AppText>

			<AppText color='strong' size='titleSm' weight='semibold'>
				{ORDER_STATUS_LABELS[order.status]}
			</AppText>

			{!!order.cancellationReason && (
				<AppText color='destructive' size='bodySm'>
					{order.cancellationReason}
				</AppText>
			)}

			<AppText color='muted' size='bodySm'>
				Feito em {formatDateTime(order.createdAt)}
			</AppText>

			<AppText color='muted' size='bodySm'>
				{PAYMENT_METHOD_LABELS[order.paymentMethod]}
			</AppText>

			<AppText color='muted' size='bodySm'>
				{order.deliveryStreet}, {order.deliveryNumber} · {order.deliveryNeighborhood}
			</AppText>
		</View>
	);
}
