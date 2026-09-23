import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useFailDelivery } from 'data/modules/delivery/useCases/failDelivery/useFailDelivery';
import { useListDeliveries } from 'data/modules/delivery/useCases/listDeliveries/useListDeliveries';
import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { usePullToRefresh } from 'shared/hooks/usePullToRefresh';
import type { DriverRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import { formatDeliveryAddress } from 'shared/utils/formatDeliveryAddress';

export function useDeliveryController() {
	const navigation = useNavigation();
	const { params } = useRoute<RouteProp<DriverRoutesParamList, 'Delivery'>>();
	const { orderId } = params;

	const { deliveries, isLoadingDeliveries, deliveriesError, refetchDeliveries } =
		useListDeliveries();
	const { isRefreshing, handleRefresh } = usePullToRefresh(refetchDeliveries);
	const { failDelivery, isFailingDelivery } = useFailDelivery();
	const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);

	const delivery = deliveries.find(({ id }) => id === orderId) ?? null;

	function handleGoBack() {
		navigation.goBack();
	}

	function handleConfirmed() {
		Alert.alert('Entrega confirmada', 'O pedido foi marcado como entregue.');
		navigation.goBack();
	}

	function handleCallCustomer() {
		if (delivery?.customerPhone) {
			Linking.openURL(`tel:${delivery.customerPhone}`);
		}
	}

	function handleOpenMap() {
		if (!delivery) {
			return;
		}

		const query = encodeURIComponent(formatDeliveryAddress(delivery));

		Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
	}

	function handleFailDelivery() {
		Alert.alert(
			'Entrega frustrada',
			'Use quando não foi possível entregar: cliente ausente, endereço errado. O pedido encerra aqui.',
			[
				{ text: 'Voltar', style: 'cancel' },
				{
					text: 'Registrar',
					style: 'destructive',
					onPress: async () => {
						setActionErrorMessage(null);

						try {
							await failDelivery({ orderId });
							navigation.goBack();
						} catch (error) {
							setActionErrorMessage(getApiErrorMessage(error));
						}
					}
				}
			]
		);
	}

	function handleRetry() {
		refetchDeliveries();
	}

	return {
		orderId,
		delivery,
		isLoadingDelivery: isLoadingDeliveries,
		isFailingDelivery,
		isRefreshing,
		errorMessage: deliveriesError ? getApiErrorMessage(deliveriesError) : '',
		actionErrorMessage,
		hasError: !!deliveriesError && !delivery,
		isMissing: !isLoadingDeliveries && !deliveriesError && !delivery,
		handleGoBack,
		handleConfirmed,
		handleCallCustomer,
		handleOpenMap,
		handleFailDelivery,
		handleRetry,
		handleRefresh
	};
}
