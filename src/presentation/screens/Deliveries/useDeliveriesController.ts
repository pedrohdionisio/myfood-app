import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { useListDeliveries } from 'data/modules/delivery/useCases/listDeliveries/useListDeliveries';
import { usePullToRefresh } from 'shared/hooks/usePullToRefresh';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { DeliveriesListState, IHandleOpenDeliveryParams } from './DeliveriesTypes';

export function useDeliveriesController() {
	const navigation = useNavigation();
	const contentPadding = useScreenPadding();
	const { driver, signOut } = useAuth();

	const { deliveries, isLoadingDeliveries, deliveriesError, refetchDeliveries } =
		useListDeliveries();
	const { isRefreshing, handleRefresh } = usePullToRefresh(refetchDeliveries);

	function resolveListState(): DeliveriesListState {
		if (isLoadingDeliveries) {
			return 'loading';
		}

		if (deliveriesError) {
			return 'error';
		}

		return 'empty';
	}

	function handleOpenDelivery({ orderId }: IHandleOpenDeliveryParams) {
		navigation.navigate('Delivery', { orderId });
	}

	function handleEditProfile() {
		navigation.navigate('EditProfile');
	}

	async function handleSignOut() {
		await signOut();
	}

	return {
		deliveries,
		driverName: driver?.name ?? '',
		contentPadding,
		listState: resolveListState(),
		errorMessage: deliveriesError ? getApiErrorMessage(deliveriesError) : '',
		isRefreshing,
		handleOpenDelivery,
		handleRefresh,
		handleEditProfile,
		handleSignOut
	};
}
