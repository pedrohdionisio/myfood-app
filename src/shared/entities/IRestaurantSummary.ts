import type { ICuisineCategory } from './ICuisineCategory';
import type { IImageUrls } from './IImageUrls';

export interface IRestaurantSummary {
	id: string;
	slug: string;
	tradeName: string;
	description: string | null;
	logoUrls: IImageUrls | null;
	bannerUrls: IImageUrls | null;
	city: string;
	state: string;
	deliveryFeeCents: number;
	minOrderCents: number;
	avgPrepTimeMin: number;
	isAcceptingOrders: boolean;
	isOpenNow: boolean;
	cuisines: Pick<ICuisineCategory, 'id' | 'name' | 'slug'>[];
	ratingAvg: number;
	ratingCount: number;
}
