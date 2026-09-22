import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import type { IOrderDeliveryCodeProps } from './OrderDeliveryCodeTypes';

export function OrderDeliveryCode({ deliveryCode }: IOrderDeliveryCodeProps) {
	return (
		<View className='items-center gap-2 rounded-xl border border-brand bg-brand-subtle p-4'>
			<AppText color='muted' size='label' weight='medium'>
				Código de entrega
			</AppText>

			<AppText color='brand' size='titleLg' weight='bold'>
				{deliveryCode}
			</AppText>

			<AppText align='center' color='muted' size='bodySm'>
				Informe este código ao entregador para confirmar o recebimento.
			</AppText>
		</View>
	);
}
