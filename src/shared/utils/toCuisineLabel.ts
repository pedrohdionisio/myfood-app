import type { IRestaurantSummary } from 'shared/entities/IRestaurantSummary';

export function toCuisineLabel(cuisines: IRestaurantSummary['cuisines']) {
	return cuisines.map((cuisine) => cuisine.name).join(' · ');
}
