import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApiErrorMessage } from 'data/config/apiError';
import { useCreatePixPayment } from 'data/modules/payment/useCases/createPixPayment/useCreatePixPayment';
import { useGetPayment } from 'data/modules/payment/useCases/getPayment/useGetPayment';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import { useRemainingTime } from './hooks/useRemainingTime';
import { formatRemainingTime } from './utils/formatRemainingTime';

export function usePaymentController() {
	const navigation = useNavigation<NativeStackNavigationProp<AppRoutesParamList>>();
	const { params } = useRoute<RouteProp<AppRoutesParamList, 'Payment'>>();
	const { orderId } = params;

	const { createPixPayment, isCreatingPixPayment } = useCreatePixPayment();
	const { payment, paymentError } = useGetPayment(orderId, !isCreatingPixPayment);

	const [createError, setCreateError] = useState<unknown>(null);
	const [hasCopied, setHasCopied] = useState(false);
	const remainingMs = useRemainingTime(payment?.expiresAt ?? null);

	useEffect(() => {
		createPixPayment(orderId).catch(setCreateError);
	}, [createPixPayment, orderId]);

	useEffect(() => {
		if (payment?.status === 'PAID') {
			navigation.replace('Order', { orderId });
		}
	}, [payment?.status, navigation, orderId]);

	async function handleCopyCode() {
		if (!payment) {
			return;
		}

		await Clipboard.setStringAsync(payment.brCode);
		setHasCopied(true);
	}

	function handleGoToOrder() {
		navigation.replace('Order', { orderId });
	}

	const error = createError ?? paymentError;
	const isExpired = remainingMs === 0;

	return {
		payment,
		hasCopied,
		isExpired,
		expirationLabel:
			remainingMs === null
				? ''
				: isExpired
					? 'O código expirou. Estamos confirmando o pedido.'
					: `O código expira em ${formatRemainingTime(remainingMs)}`,
		isLoadingPayment: isCreatingPixPayment || (!payment && !error),
		errorMessage: error ? getApiErrorMessage(error) : '',
		handleCopyCode,
		handleGoToOrder
	};
}
