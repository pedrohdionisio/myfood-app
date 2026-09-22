import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ORDER_MUTATION_KEYS, ORDER_QUERY_KEYS } from 'data/modules/order/keys/OrderKeys';
import { OrderService } from 'data/modules/order/services/OrderService';

export function useCancelOrder() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [ORDER_MUTATION_KEYS.CANCEL_ORDER],
		mutationFn: OrderService.cancel,
		onSuccess: (order) => {
			queryClient.setQueryData([ORDER_QUERY_KEYS.GET_ORDER, order.id], order);

			return queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEYS.LIST_ORDERS] });
		}
	});

	return {
		cancelOrder: mutateAsync,
		isCancelingOrder: isPending
	};
}
