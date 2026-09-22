import type { IOpeningHour } from './IOpeningHour';
import type { IRestaurantSummary } from './IRestaurantSummary';

export interface IPublicRestaurant extends IRestaurantSummary {
	neighborhood: string;
	openingHours: IOpeningHour[];
}
