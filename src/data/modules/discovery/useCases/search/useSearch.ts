import { useQuery } from '@tanstack/react-query';
import { DISCOVERY_QUERY_KEYS } from 'data/modules/discovery/keys/DiscoveryKeys';
import { DiscoveryService } from 'data/modules/discovery/services/DiscoveryService';

const MIN_QUERY_LENGTH = 2;

export function useSearch(query: string) {
	const trimmedQuery = query.trim();

	const { data, isFetching, error } = useQuery({
		queryKey: [DISCOVERY_QUERY_KEYS.SEARCH, trimmedQuery],
		queryFn: () => DiscoveryService.search({ q: trimmedQuery }),
		enabled: trimmedQuery.length >= MIN_QUERY_LENGTH
	});

	return {
		foundRestaurants: data?.restaurants ?? [],
		foundProducts: data?.products ?? [],
		isSearching: isFetching,
		searchError: error,
		isQueryTooShort: trimmedQuery.length < MIN_QUERY_LENGTH
	};
}
