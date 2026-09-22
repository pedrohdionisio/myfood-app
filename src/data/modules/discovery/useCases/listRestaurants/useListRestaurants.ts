import { useInfiniteQuery } from '@tanstack/react-query';
import { DISCOVERY_QUERY_KEYS } from 'data/modules/discovery/keys/DiscoveryKeys';
import { DiscoveryService } from 'data/modules/discovery/services/DiscoveryService';
import type { IUseListRestaurantsParams } from './UseListRestaurantsTypes';

const MIN_TERM_LENGTH = 2;

export function useListRestaurants({
	term,
	cuisineSlug,
	includeClosed
}: IUseListRestaurantsParams) {
	const searchTerm = term.trim().length >= MIN_TERM_LENGTH ? term.trim() : undefined;

	const { data, isPending, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [DISCOVERY_QUERY_KEYS.LIST_RESTAURANTS, searchTerm, cuisineSlug, includeClosed],
			queryFn: ({ pageParam }) =>
				DiscoveryService.listRestaurants({
					page: pageParam,
					q: searchTerm,
					cuisineSlug: cuisineSlug ?? undefined,
					includeClosed
				}),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined)
		});

	return {
		restaurants: data?.pages.flatMap((page) => page.items) ?? [],
		isLoadingRestaurants: isPending,
		restaurantsError: error,
		refetchRestaurants: refetch,
		fetchMoreRestaurants: fetchNextPage,
		hasMoreRestaurants: hasNextPage,
		isFetchingMoreRestaurants: isFetchingNextPage
	};
}
