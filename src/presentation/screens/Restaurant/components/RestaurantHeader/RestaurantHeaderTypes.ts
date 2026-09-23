import type { IPublicRestaurant } from 'shared/entities/IPublicRestaurant';

export interface IRestaurantHeaderProps {
	restaurant: IPublicRestaurant;
	topInset: number;
	onOpenReviews: () => void;
}
