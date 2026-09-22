import type { IRestaurantSummary } from 'shared/entities/IRestaurantSummary';

export interface IListRestaurantsPayload {
	page: number;
	addressId?: string;
	q?: string;
	cuisineSlug?: string;
	includeClosed: boolean;
}

export interface IListRestaurantsResponse {
	items: IRestaurantSummary[];
	page: number;
	perPage: number;
	hasMore: boolean;
}
