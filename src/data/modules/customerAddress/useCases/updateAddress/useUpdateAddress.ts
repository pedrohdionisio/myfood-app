import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	CUSTOMER_ADDRESS_MUTATION_KEYS,
	CUSTOMER_ADDRESS_QUERY_KEYS
} from 'data/modules/customerAddress/keys/CustomerAddressKeys';
import { CustomerAddressService } from 'data/modules/customerAddress/services/CustomerAddressService';

export function useUpdateAddress() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [CUSTOMER_ADDRESS_MUTATION_KEYS.UPDATE_ADDRESS],
		mutationFn: CustomerAddressService.update,
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [CUSTOMER_ADDRESS_QUERY_KEYS.LIST_ADDRESSES]
			})
	});

	return {
		updateAddress: mutateAsync,
		isUpdatingAddress: isPending
	};
}
