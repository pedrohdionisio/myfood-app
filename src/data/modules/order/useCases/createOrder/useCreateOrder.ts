import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ORDER_MUTATION_KEYS, ORDER_QUERY_KEYS } from 'data/modules/order/keys/OrderKeys';
import { OrderService } from 'data/modules/order/services/OrderService';

export function useCreateOrder() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [ORDER_MUTATION_KEYS.CREATE_ORDER],
		mutationFn: OrderService.create,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEYS.LIST_ORDERS] })
	});

	return {
		createOrder: mutateAsync,
		isCreatingOrder: isPending
	};
}
