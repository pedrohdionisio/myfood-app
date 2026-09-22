import { useInfiniteQuery } from '@tanstack/react-query';
import { ORDER_QUERY_KEYS } from 'data/modules/order/keys/OrderKeys';
import { OrderService } from 'data/modules/order/services/OrderService';

export function useListOrders() {
	const { data, isPending, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [ORDER_QUERY_KEYS.LIST_ORDERS],
			queryFn: ({ pageParam }) => OrderService.list({ page: pageParam }),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined)
		});

	return {
		orders: data?.pages.flatMap((page) => page.items) ?? [],
		isLoadingOrders: isPending,
		ordersError: error,
		refetchOrders: refetch,
		fetchMoreOrders: fetchNextPage,
		hasMoreOrders: hasNextPage,
		isFetchingMoreOrders: isFetchingNextPage
	};
}
