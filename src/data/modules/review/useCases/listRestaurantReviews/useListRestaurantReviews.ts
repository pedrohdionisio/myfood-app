import { useInfiniteQuery } from '@tanstack/react-query';
import { REVIEW_QUERY_KEYS } from 'data/modules/review/keys/ReviewKeys';
import { ReviewService } from 'data/modules/review/services/ReviewService';

export function useListRestaurantReviews(slug: string) {
	const { data, isPending, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [REVIEW_QUERY_KEYS.LIST_RESTAURANT_REVIEWS, slug],
			queryFn: ({ pageParam }) => ReviewService.listByRestaurant({ slug, page: pageParam }),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined)
		});

	return {
		reviews: data?.pages.flatMap((page) => page.items) ?? [],
		isLoadingReviews: isPending,
		reviewsError: error,
		refetchReviews: refetch,
		fetchMoreReviews: fetchNextPage,
		hasMoreReviews: hasNextPage,
		isFetchingMoreReviews: isFetchingNextPage
	};
}
