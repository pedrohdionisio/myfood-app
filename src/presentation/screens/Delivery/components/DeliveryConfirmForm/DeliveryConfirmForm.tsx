import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { View } from 'react-native';
import type { IDeliveryConfirmFormProps } from './DeliveryConfirmFormTypes';
import { useDeliveryConfirmFormController } from './useDeliveryConfirmFormController';

export function DeliveryConfirmForm({ orderId, onConfirmed }: IDeliveryConfirmFormProps) {
	const { control, apiErrorMessage, isConfirmingDelivery, handleSubmit } =
		useDeliveryConfirmFormController({ orderId, onConfirmed });

	return (
		<View className='gap-4 rounded-xl border border-gray-200 bg-white p-4'>
			<AppText color='muted' size='bodySm'>
				Peça ao cliente o código de 4 dígitos que aparece no app dele.
			</AppText>

			<Input
				autoComplete='off'
				control={control}
				keyboardType='number-pad'
				label='Código de entrega'
				maxLength={4}
				name='code'
				placeholder='0000'
			/>

			{!!apiErrorMessage && (
				<AppText color='destructive' size='bodySm'>
					{apiErrorMessage}
				</AppText>
			)}

			<Button isLoading={isConfirmingDelivery} onPress={handleSubmit} title='Confirmar entrega' />
		</View>
	);
}
