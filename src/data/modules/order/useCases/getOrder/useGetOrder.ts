import { useQuery } from '@tanstack/react-query';
import { ORDER_QUERY_KEYS } from 'data/modules/order/keys/OrderKeys';
import { OrderService } from 'data/modules/order/services/OrderService';
import { isFinishedOrder } from 'shared/utils/isFinishedOrder';

const POLL_INTERVAL_MS = 15000;

export function useGetOrder(orderId: string) {
	const { data, isPending, error, refetch } = useQuery({
		queryKey: [ORDER_QUERY_KEYS.GET_ORDER, orderId],
		queryFn: () => OrderService.getById(orderId),
		refetchInterval: (query) => {
			const status = query.state.data?.status;

			if (!status || isFinishedOrder(status)) {
				return false;
			}

			return POLL_INTERVAL_MS;
		}
	});

	return {
		order: data ?? null,
		isLoadingOrder: isPending,
		orderError: error,
		refetchOrder: refetch
	};
}
