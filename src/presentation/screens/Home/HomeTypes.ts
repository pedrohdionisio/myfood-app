export type RestaurantsListState = 'loading' | 'missingAddress' | 'error' | 'noResults' | 'empty';

export interface IHandleSelectCuisineParams {
	cuisineSlug: string;
}

export interface IHandleToggleIncludeClosedParams {
	includeClosed: boolean;
}
