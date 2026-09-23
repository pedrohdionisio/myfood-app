export type RestaurantsListState = 'loading' | 'missingAddress' | 'error' | 'noResults' | 'empty';

export interface IHandleSelectCuisineParams {
	cuisineSlug: string;
}

export interface IHandleToggleIncludeClosedParams {
	includeClosed: boolean;
}

export interface IHandleSelectAddressParams {
	addressId: string;
}

export interface IHandleOpenRestaurantParams {
	restaurantId: string;
	slug: string;
}
