import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApiErrorMessage } from 'data/config/apiError';
import { useCancelOrder } from 'data/modules/order/useCases/cancelOrder/useCancelOrder';
import { useGetOrder } from 'data/modules/order/useCases/getOrder/useGetOrder';
import { useGetOrderReview } from 'data/modules/review/useCases/getOrderReview/useGetOrderReview';
import { useState } from 'react';
import { Alert } from 'react-native';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import { isFinishedOrder } from 'shared/utils/isFinishedOrder';

export function useOrderController() {
	const navigation = useNavigation<NativeStackNavigationProp<AppRoutesParamList>>();
	const { params } = useRoute<RouteProp<AppRoutesParamList, 'Order'>>();
	const { orderId } = params;

	const { order, isLoadingOrder, orderError, refetchOrder } = useGetOrder(orderId);
	const { cancelOrder, isCancelingOrder } = useCancelOrder();
	const isDelivered = order?.status === 'DELIVERED';
	const { review, isLoadingReview, reviewError } = useGetOrderReview(isDelivered ? orderId : null);
	const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);

	function handleCancel() {
		Alert.alert('Cancelar pedido', 'Esta ação não pode ser desfeita.', [
			{ text: 'Voltar', style: 'cancel' },
			{
				text: 'Cancelar pedido',
				style: 'destructive',
				onPress: async () => {
					setActionErrorMessage(null);

					try {
						await cancelOrder({ orderId });
					} catch (error) {
						setActionErrorMessage(getApiErrorMessage(error));
					}
				}
			}
		]);
	}

	function handleGoToPayment() {
		navigation.navigate('Payment', { orderId });
	}

	function handleGoToReview() {
		navigation.navigate('OrderReview', { orderId });
	}

	function handleRetry() {
		refetchOrder();
	}

	function handleGoBack() {
		navigation.goBack();
	}

	return {
		order,
		isLoadingOrder,
		isCancelingOrder,
		errorMessage: orderError ? getApiErrorMessage(orderError) : '',
		actionErrorMessage,
		canCancel: order?.status === 'PENDING',
		shouldShowDeliveryCode: !!order && !isFinishedOrder(order.status),
		shouldShowPayment: order?.status === 'PENDING_PAYMENT',
		shouldShowReview: isDelivered,
		review,
		isLoadingReview,
		reviewErrorMessage: reviewError ? getApiErrorMessage(reviewError) : '',
		handleCancel,
		handleGoToPayment,
		handleGoToReview,
		handleRetry,
		handleGoBack
	};
}
