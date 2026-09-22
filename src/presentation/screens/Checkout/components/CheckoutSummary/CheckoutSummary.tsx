import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { formatPrice } from 'shared/utils/formatPrice';
import type { ICheckoutSummaryProps } from './CheckoutSummaryTypes';

export function CheckoutSummary({
	subtotalCents,
	deliveryFeeCents,
	totalCents
}: ICheckoutSummaryProps) {
	return (
		<View className='gap-2 rounded-xl border border-gray-200 bg-white p-4'>
			<View className='flex-row items-center justify-between'>
				<AppText color='muted' size='bodySm'>
					Subtotal
				</AppText>

				<AppText color='default' size='bodySm'>
					{formatPrice(subtotalCents)}
				</AppText>
			</View>

			<View className='flex-row items-center justify-between'>
				<AppText color='muted' size='bodySm'>
					Entrega
				</AppText>

				<AppText color='default' size='bodySm'>
					{deliveryFeeCents === 0 ? 'Grátis' : formatPrice(deliveryFeeCents)}
				</AppText>
			</View>

			<View className='mt-1 flex-row items-center justify-between border-gray-200 border-t pt-3'>
				<AppText color='strong' size='bodyMd' weight='semibold'>
					Total
				</AppText>

				<AppText color='strong' size='bodyMd' weight='semibold'>
					{formatPrice(totalCents)}
				</AppText>
			</View>
		</View>
	);
}
