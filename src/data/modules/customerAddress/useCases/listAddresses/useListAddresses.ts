import { useQuery } from '@tanstack/react-query';
import { CUSTOMER_ADDRESS_QUERY_KEYS } from 'data/modules/customerAddress/keys/CustomerAddressKeys';
import { CustomerAddressService } from 'data/modules/customerAddress/services/CustomerAddressService';

export function useListAddresses() {
	const { data, isPending, error, refetch } = useQuery({
		queryKey: [CUSTOMER_ADDRESS_QUERY_KEYS.LIST_ADDRESSES],
		queryFn: CustomerAddressService.list
	});

	return {
		addresses: data ?? [],
		isLoadingAddresses: isPending,
		addressesError: error,
		refetchAddresses: refetch
	};
}
