import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	CUSTOMER_ADDRESS_MUTATION_KEYS,
	CUSTOMER_ADDRESS_QUERY_KEYS
} from 'data/modules/customerAddress/keys/CustomerAddressKeys';
import { CustomerAddressService } from 'data/modules/customerAddress/services/CustomerAddressService';

export function useCreateAddress() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [CUSTOMER_ADDRESS_MUTATION_KEYS.CREATE_ADDRESS],
		mutationFn: CustomerAddressService.create,
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [CUSTOMER_ADDRESS_QUERY_KEYS.LIST_ADDRESSES]
			})
	});

	return {
		createAddress: mutateAsync,
		isCreatingAddress: isPending
	};
}
