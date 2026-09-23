import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { useListDeliveries } from 'data/modules/delivery/useCases/listDeliveries/useListDeliveries';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { DeliveriesListState, IHandleOpenDeliveryParams } from './DeliveriesTypes';

export function useDeliveriesController() {
	const navigation = useNavigation();
	const contentPadding = useScreenPadding();
	const { driver, signOut } = useAuth();

	const {
		deliveries,
		isLoadingDeliveries,
		isRefetchingDeliveries,
		deliveriesError,
		refetchDeliveries
	} = useListDeliveries();

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

	function handleRefresh() {
		refetchDeliveries();
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
		isRefreshing: isRefetchingDeliveries,
		handleOpenDelivery,
		handleRefresh,
		handleEditProfile,
		handleSignOut
	};
}
