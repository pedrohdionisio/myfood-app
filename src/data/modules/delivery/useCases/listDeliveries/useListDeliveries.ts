import { useQuery } from '@tanstack/react-query';
import { DELIVERY_QUERY_KEYS } from 'data/modules/delivery/keys/DeliveryKeys';
import { DeliveryService } from 'data/modules/delivery/services/DeliveryService';

const POLL_INTERVAL_MS = 30000;

export function useListDeliveries() {
	const { data, isPending, error, refetch } = useQuery({
		queryKey: [DELIVERY_QUERY_KEYS.LIST_DELIVERIES],
		queryFn: DeliveryService.list,
		refetchInterval: POLL_INTERVAL_MS
	});

	return {
		deliveries: data ?? [],
		isLoadingDeliveries: isPending,
		deliveriesError: error,
		refetchDeliveries: refetch
	};
}
