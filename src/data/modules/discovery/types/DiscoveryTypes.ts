import type { IProductHit } from 'shared/entities/IProductHit';
import type { IRestaurantSummary } from 'shared/entities/IRestaurantSummary';

export interface IListRestaurantsPayload {
	page: number;
	addressId?: string;
}

export interface IListRestaurantsResponse {
	items: IRestaurantSummary[];
	page: number;
	perPage: number;
	hasMore: boolean;
}

export interface ISearchPayload {
	q: string;
	addressId?: string;
}

export interface ISearchResponse {
	restaurants: IRestaurantSummary[];
	products: IProductHit[];
}
