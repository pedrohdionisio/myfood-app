import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	DELIVERY_MUTATION_KEYS,
	DELIVERY_QUERY_KEYS
} from 'data/modules/delivery/keys/DeliveryKeys';
import { DeliveryService } from 'data/modules/delivery/services/DeliveryService';

export function useFailDelivery() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [DELIVERY_MUTATION_KEYS.FAIL_DELIVERY],
		mutationFn: DeliveryService.fail,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [DELIVERY_QUERY_KEYS.LIST_DELIVERIES] })
	});

	return {
		failDelivery: mutateAsync,
		isFailingDelivery: isPending
	};
}
