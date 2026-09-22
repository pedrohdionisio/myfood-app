import { useQuery } from '@tanstack/react-query';
import { ADDRESS_QUERY_KEYS } from 'data/modules/address/keys/AddressKeys';
import { AddressService } from 'data/modules/address/services/AddressService';
import { onlyDigits } from 'shared/utils/onlyDigits';

export function useAddressByZipCode(zipCode: string) {
	const zipCodeDigits = onlyDigits(zipCode);

	const { data, isFetching, error } = useQuery({
		queryKey: [ADDRESS_QUERY_KEYS.ADDRESS_BY_ZIP_CODE, zipCodeDigits],
		queryFn: () => AddressService.findByZipCode(zipCodeDigits),
		enabled: zipCodeDigits.length === 8,
		staleTime: Number.POSITIVE_INFINITY
	});

	return {
		address: data ?? null,
		isZipCodeNotFound: data === null,
		isLoadingAddress: isFetching,
		addressError: error
	};
}
