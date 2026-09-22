import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApiErrorMessage } from 'data/config/apiError';
import { useCart } from 'data/contexts/CartProvider/CartProvider';
import { useListAddresses } from 'data/modules/customerAddress/useCases/listAddresses/useListAddresses';
import { useCreateOrder } from 'data/modules/order/useCases/createOrder/useCreateOrder';
import { randomUUID } from 'expo-crypto';
import { useRef, useState } from 'react';
import type { PaymentMethod } from 'shared/constants/orders';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import { onlyDigits } from 'shared/utils/onlyDigits';
import type { IHandleRemoveItemParams, IHandleSelectAddressParams } from './CheckoutTypes';

const CENTS_IN_REAL = 100;

export function useCheckoutController() {
	const navigation = useNavigation<NativeStackNavigationProp<AppRoutesParamList>>();
	const addressSheetRef = useRef<BottomSheetModal>(null);
	const idempotencyKey = useRef(randomUUID());

	const { cart, itemCount, subtotalCents, removeCartItem, clearCart } = useCart();
	const { addresses, isLoadingAddresses } = useListAddresses();
	const { createOrder, isCreatingOrder } = useCreateOrder();

	const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ONLINE');
	const [changeFor, setChangeFor] = useState('');
	const [notes, setNotes] = useState('');
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const selectedAddress =
		addresses.find((address) => address.id === selectedAddressId) ?? addresses[0] ?? null;

	const deliveryFeeCents = cart?.restaurant.deliveryFeeCents ?? 0;
	const minOrderCents = cart?.restaurant.minOrderCents ?? 0;
	const totalCents = subtotalCents + deliveryFeeCents;
	const isBelowMinimum = subtotalCents < minOrderCents;

	function handleRemoveItem({ productId }: IHandleRemoveItemParams) {
		removeCartItem({ productId });
	}

	function handleOpenAddressSheet() {
		addressSheetRef.current?.present();
	}

	function handleSelectAddress({ addressId }: IHandleSelectAddressParams) {
		setSelectedAddressId(addressId);
		addressSheetRef.current?.dismiss();
	}

	function handleManageAddresses() {
		addressSheetRef.current?.dismiss();
		navigation.navigate('Addresses');
	}

	function handleSelectPaymentMethod(method: PaymentMethod) {
		setPaymentMethod(method);
	}

	function handleChangeFor(value: string) {
		setChangeFor(onlyDigits(value));
	}

	function handleChangeNotes(value: string) {
		setNotes(value);
	}

	function handleGoBack() {
		navigation.goBack();
	}

	async function handleSubmit() {
		if (!cart || !selectedAddress) {
			return;
		}

		setApiErrorMessage(null);

		try {
			const order = await createOrder({
				idempotencyKey: idempotencyKey.current,
				restaurantId: cart.restaurant.id,
				addressId: selectedAddress.id,
				paymentMethod,
				changeForCents:
					paymentMethod === 'CASH' && changeFor ? Number(changeFor) * CENTS_IN_REAL : undefined,
				notes: notes.trim() || undefined,
				items: cart.items.map((item) => ({
					productId: item.product.id,
					quantity: item.quantity,
					notes: item.notes ?? undefined
				}))
			});

			clearCart();

			if (order.status === 'PENDING_PAYMENT') {
				navigation.replace('Payment', { orderId: order.id });

				return;
			}

			navigation.replace('Order', { orderId: order.id });
		} catch (error) {
			setApiErrorMessage(getApiErrorMessage(error));
		}
	}

	return {
		cart,
		itemCount,
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
		isLoadingAddresses,
		isCreatingOrder,
		canSubmit: !!cart && !!selectedAddress && !isBelowMinimum,
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
	};
}
