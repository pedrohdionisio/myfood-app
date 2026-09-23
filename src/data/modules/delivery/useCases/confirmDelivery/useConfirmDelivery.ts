import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	DELIVERY_MUTATION_KEYS,
	DELIVERY_QUERY_KEYS
} from 'data/modules/delivery/keys/DeliveryKeys';
import { DeliveryService } from 'data/modules/delivery/services/DeliveryService';

export function useConfirmDelivery() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [DELIVERY_MUTATION_KEYS.CONFIRM_DELIVERY],
		mutationFn: DeliveryService.confirm,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [DELIVERY_QUERY_KEYS.LIST_DELIVERIES] })
	});

	return {
		confirmDelivery: mutateAsync,
		isConfirmingDelivery: isPending
	};
}
