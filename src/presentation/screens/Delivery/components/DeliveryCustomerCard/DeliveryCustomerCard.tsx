import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { View } from 'react-native';
import { formatDeliveryAddress } from 'shared/utils/formatDeliveryAddress';
import type { IDeliveryCustomerCardProps } from './DeliveryCustomerCardTypes';

export function DeliveryCustomerCard({
	delivery,
	onCallCustomer,
	onOpenMap
}: IDeliveryCustomerCardProps) {
	return (
		<View className='gap-3 rounded-xl border border-gray-200 bg-white p-4'>
			<View className='gap-1'>
				<AppText color='muted' size='label' weight='medium'>
					{delivery.restaurantTradeName} · {delivery.itemCount}{' '}
					{delivery.itemCount === 1 ? 'item' : 'itens'}
				</AppText>

				<AppText color='strong' size='titleSm' weight='semibold'>
					{delivery.customerName}
				</AppText>

				<AppText color='default' size='bodySm'>
					{formatDeliveryAddress(delivery)}
				</AppText>

				{!!delivery.deliveryReference && (
					<AppText color='muted' size='bodySm'>
						Referência: {delivery.deliveryReference}
					</AppText>
				)}
			</View>

			<View className='flex-row gap-3'>
				<Button
					className='flex-1'
					onPress={onOpenMap}
					size='md'
					title='Abrir no mapa'
					variant='outline'
				/>

				{!!delivery.customerPhone && (
					<Button
						className='flex-1'
						onPress={onCallCustomer}
						size='md'
						title='Ligar'
						variant='outline'
					/>
				)}
			</View>
		</View>
	);
}
