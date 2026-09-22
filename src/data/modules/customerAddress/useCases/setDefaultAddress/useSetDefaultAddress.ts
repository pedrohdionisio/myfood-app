import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	CUSTOMER_ADDRESS_MUTATION_KEYS,
	CUSTOMER_ADDRESS_QUERY_KEYS
} from 'data/modules/customerAddress/keys/CustomerAddressKeys';
import { CustomerAddressService } from 'data/modules/customerAddress/services/CustomerAddressService';

export function useSetDefaultAddress() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [CUSTOMER_ADDRESS_MUTATION_KEYS.SET_DEFAULT_ADDRESS],
		mutationFn: CustomerAddressService.setDefault,
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [CUSTOMER_ADDRESS_QUERY_KEYS.LIST_ADDRESSES]
			})
	});

	return {
		setDefaultAddress: mutateAsync,
		isSettingDefaultAddress: isPending
	};
}
