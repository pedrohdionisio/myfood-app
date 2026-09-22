import type { IRestaurantSummary } from 'shared/entities/IRestaurantSummary';

export interface IRestaurantCardProps {
	restaurant: IRestaurantSummary;
	onPress: () => void;
}
