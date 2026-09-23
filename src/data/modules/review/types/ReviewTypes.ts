import type { IPublicReview } from 'shared/entities/IPublicReview';

export interface ICreateReviewPayload {
	orderId: string;
	rating: number;
	comment?: string;
}

export interface IListRestaurantReviewsPayload {
	slug: string;
	page: number;
}

export interface IListRestaurantReviewsResponse {
	items: IPublicReview[];
	page: number;
	perPage: number;
	hasMore: boolean;
}
