import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ORDER_QUERY_KEYS } from 'data/modules/order/keys/OrderKeys';
import { REVIEW_MUTATION_KEYS, REVIEW_QUERY_KEYS } from 'data/modules/review/keys/ReviewKeys';
import { ReviewService } from 'data/modules/review/services/ReviewService';

export function useCreateReview() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [REVIEW_MUTATION_KEYS.CREATE_REVIEW],
		mutationFn: ReviewService.create,
		onSuccess: (review) => {
			queryClient.setQueryData([REVIEW_QUERY_KEYS.GET_ORDER_REVIEW, review.orderId], review);

			return Promise.all([
				queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEYS.LIST_ORDERS] }),
				queryClient.invalidateQueries({ queryKey: [REVIEW_QUERY_KEYS.LIST_RESTAURANT_REVIEWS] })
			]);
		}
	});

	return {
		createReview: mutateAsync,
		isCreatingReview: isPending
	};
}
