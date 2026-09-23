import { skipToken, useQuery } from '@tanstack/react-query';
import { REVIEW_QUERY_KEYS } from 'data/modules/review/keys/ReviewKeys';
import { ReviewService } from 'data/modules/review/services/ReviewService';

export function useGetOrderReview(orderId: string | null) {
	const { data, isPending, error, refetch } = useQuery({
		queryKey: [REVIEW_QUERY_KEYS.GET_ORDER_REVIEW, orderId],
		queryFn: orderId ? () => ReviewService.getByOrder(orderId) : skipToken
	});

	return {
		review: data ?? null,
		isLoadingReview: !!orderId && isPending,
		reviewError: error,
		refetchReview: refetch
	};
}
