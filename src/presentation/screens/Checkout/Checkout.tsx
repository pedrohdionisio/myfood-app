import { AddressSheet } from 'presentation/components/AddressSheet/AddressSheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { EmptyState } from 'presentation/components/EmptyState/EmptyState';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { TextInput, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { PAYMENT_METHOD_LABELS, PAYMENT_METHODS } from 'shared/constants/orders';
import { formatPrice } from 'shared/utils/formatPrice';
import { CheckoutAddressCard } from './components/CheckoutAddressCard/CheckoutAddressCard';
import { CheckoutItemRow } from './components/CheckoutItemRow/CheckoutItemRow';
import { CheckoutSummary } from './components/CheckoutSummary/CheckoutSummary';
import { PaymentMethodOption } from './components/PaymentMethodOption/PaymentMethodOption';
import { useCheckoutController } from './useCheckoutController';

export function Checkout() {
	const {
		cart,
		addresses,
		selectedAddress,
		addressSheetRef,
		paymentMethod,
		changeFor,
		notes,
		subtotalCents,
		deliveryFeeCents,
		totalCents,
		minOrderCents,
		isBelowMinimum,
		isCreatingOrder,
		canSubmit,
		apiErrorMessage,
		handleRemoveItem,
		handleOpenAddressSheet,
		handleSelectAddress,
		handleManageAddresses,
		handleSelectPaymentMethod,
		handleChangeFor,
		handleChangeNotes,
		handleSubmit,
		handleGoBack
	} = useCheckoutController();

	return (
		<ScreenLayout className='gap-6'>
			<ScreenHeader onBack={handleGoBack} title='Resumo do pedido' />

			{cart ? (
				<>
					<View>
						<AppText className='mb-2' color='muted' size='label' weight='medium'>
							{cart.restaurant.tradeName}
						</AppText>

						{cart.items.map((item) => (
							<CheckoutItemRow
								item={item}
								key={item.product.id}
								onRemove={() => handleRemoveItem({ productId: item.product.id })}
							/>
						))}
					</View>

					<View className='gap-2'>
						<AppText color='muted' size='label' weight='medium'>
							Entrega
						</AppText>

						<CheckoutAddressCard address={selectedAddress} onPress={handleOpenAddressSheet} />
					</View>

					<View className='gap-2'>
						<AppText color='muted' size='label' weight='medium'>
							Pagamento
						</AppText>

						{PAYMENT_METHODS.map((method) => (
							<PaymentMethodOption
								isSelected={paymentMethod === method}
								key={method}
								label={PAYMENT_METHOD_LABELS[method]}
								onPress={() => handleSelectPaymentMethod(method)}
							/>
						))}

						{paymentMethod === 'CASH' && (
							<TextInput
								accessibilityLabel='Troco para quanto'
								className='h-12 rounded-xl border border-gray-200 bg-white px-4 font-inter-regular text-body-md text-gray-900'
								keyboardType='number-pad'
								onChangeText={handleChangeFor}
								placeholder='Troco para quanto? (R$)'
								placeholderTextColor={COLORS.gray[400]}
								value={changeFor}
							/>
						)}
					</View>

					<View className='gap-2'>
						<AppText color='muted' size='label' weight='medium'>
							Observação do pedido
						</AppText>

						<TextInput
							accessibilityLabel='Observação do pedido'
							className='min-h-12 rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter-regular text-body-md text-gray-900'
							maxLength={280}
							multiline
							onChangeText={handleChangeNotes}
							placeholder='Algo que o restaurante precisa saber'
							placeholderTextColor={COLORS.gray[400]}
							value={notes}
						/>
					</View>

					<CheckoutSummary
						deliveryFeeCents={deliveryFeeCents}
						subtotalCents={subtotalCents}
						totalCents={totalCents}
					/>

					{isBelowMinimum && (
						<AppText color='destructive' size='bodySm'>
							O pedido mínimo deste restaurante é {formatPrice(minOrderCents)}.
						</AppText>
					)}

					{!!apiErrorMessage && (
						<AppText color='destructive' size='bodySm'>
							{apiErrorMessage}
						</AppText>
					)}

					<Button
						disabled={!canSubmit}
						isLoading={isCreatingOrder}
						onPress={handleSubmit}
						title='Fazer pedido'
					/>

					<AddressSheet
						addresses={addresses}
						onManageAddresses={handleManageAddresses}
						onSelectAddress={(addressId) => handleSelectAddress({ addressId })}
						selectedAddressId={selectedAddress?.id ?? null}
						sheetRef={addressSheetRef}
					/>
				</>
			) : (
				<EmptyState
					description='Adicione itens de um restaurante para fazer um pedido.'
					title='Carrinho vazio'
				/>
			)}
		</ScreenLayout>
	);
}
