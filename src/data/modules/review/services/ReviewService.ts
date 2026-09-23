import { api } from 'data/config/api';
import { getApiErrorCode } from 'data/config/apiError';
import type {
	ICreateReviewPayload,
	IListRestaurantReviewsPayload,
	IListRestaurantReviewsResponse
} from 'data/modules/review/types/ReviewTypes';
import type { IReview } from 'shared/entities/IReview';

async function create({ orderId, ...body }: ICreateReviewPayload): Promise<IReview> {
	const { data } = await api.post<IReview>(`/orders/${orderId}/review`, body);

	return data;
}

async function getByOrder(orderId: string): Promise<IReview | null> {
	try {
		const { data } = await api.get<IReview>(`/orders/${orderId}/review`);

		return data;
	} catch (error) {
		if (getApiErrorCode(error) === 'NOT_FOUND') {
			return null;
		}

		throw error;
	}
}

async function listByRestaurant({
	slug,
	page
}: IListRestaurantReviewsPayload): Promise<IListRestaurantReviewsResponse> {
	const { data } = await api.get<IListRestaurantReviewsResponse>(
		`/discovery/restaurants/${slug}/reviews`,
		{ params: { page } }
	);

	return data;
}

export const ReviewService = {
	create,
	getByOrder,
	listByRestaurant
};
