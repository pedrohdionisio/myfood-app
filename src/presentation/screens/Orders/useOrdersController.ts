import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useListOrders } from 'data/modules/order/useCases/listOrders/useListOrders';
import { usePullToRefresh } from 'shared/hooks/usePullToRefresh';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { isFinishedOrder } from 'shared/utils/isFinishedOrder';
import type { IHandleOpenOrderParams, OrdersListRow, OrdersListState } from './OrdersTypes';

export function useOrdersController() {
	const navigation = useNavigation();
	const contentPadding = useScreenPadding();

	const {
		orders,
		isLoadingOrders,
		ordersError,
		refetchOrders,
		fetchMoreOrders,
		hasMoreOrders,
		isFetchingMoreOrders
	} = useListOrders();
	const { isRefreshing, handleRefresh } = usePullToRefresh(refetchOrders);

	function buildRows(): OrdersListRow[] {
		const active = orders.filter((order) => !isFinishedOrder(order.status));
		const finished = orders.filter((order) => isFinishedOrder(order.status));
		const rows: OrdersListRow[] = [];

		if (active.length > 0) {
			rows.push({ kind: 'section', id: 'section-active', title: 'Em andamento' });
			rows.push(...active.map((order) => ({ kind: 'order' as const, id: order.id, order })));
		}

		if (finished.length > 0) {
			rows.push({ kind: 'section', id: 'section-finished', title: 'Finalizados' });
			rows.push(...finished.map((order) => ({ kind: 'order' as const, id: order.id, order })));
		}

		return rows;
	}

	function resolveListState(): OrdersListState {
		if (isLoadingOrders) {
			return 'loading';
		}

		if (ordersError) {
			return 'error';
		}

		return 'empty';
	}

	function handleOpenOrder({ orderId }: IHandleOpenOrderParams) {
		navigation.navigate('Order', { orderId });
	}

	function handleRetry() {
		refetchOrders();
	}

	function handleEndReached() {
		if (hasMoreOrders && !isFetchingMoreOrders) {
			fetchMoreOrders();
		}
	}

	return {
		rows: buildRows(),
		contentPadding,
		listState: resolveListState(),
		errorMessage: ordersError ? getApiErrorMessage(ordersError) : '',
		isFetchingMoreOrders,
		isRefreshing,
		handleOpenOrder,
		handleRetry,
		handleEndReached,
		handleRefresh
	};
}
