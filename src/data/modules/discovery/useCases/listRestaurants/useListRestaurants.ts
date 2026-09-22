import { useInfiniteQuery } from '@tanstack/react-query';
import { DISCOVERY_QUERY_KEYS } from 'data/modules/discovery/keys/DiscoveryKeys';
import { DiscoveryService } from 'data/modules/discovery/services/DiscoveryService';

export function useListRestaurants() {
	const { data, isPending, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [DISCOVERY_QUERY_KEYS.LIST_RESTAURANTS],
			queryFn: ({ pageParam }) => DiscoveryService.listRestaurants({ page: pageParam }),
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
