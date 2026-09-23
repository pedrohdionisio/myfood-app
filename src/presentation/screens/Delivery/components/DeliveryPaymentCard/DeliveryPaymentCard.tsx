import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { PAYMENT_METHOD_LABELS } from 'shared/constants/orders';
import type { IDeliveryPaymentCardProps } from './DeliveryPaymentCardTypes';
import { toPaymentInstruction } from './utils/toPaymentInstruction';

export function DeliveryPaymentCard({ delivery }: IDeliveryPaymentCardProps) {
	return (
		<View className='gap-1 rounded-xl border border-gray-200 bg-white p-4'>
			<AppText color='muted' size='label' weight='medium'>
				Pagamento · {PAYMENT_METHOD_LABELS[delivery.paymentMethod]}
			</AppText>

			<AppText color='default' size='bodySm'>
				{toPaymentInstruction(delivery)}
			</AppText>
		</View>
	);
}
