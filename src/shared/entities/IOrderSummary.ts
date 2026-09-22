import type { OrderStatus } from 'shared/constants/orders';
import type { IImageUrls } from './IImageUrls';

export interface IOrderSummary {
	id: string;
	displayNumber: number;
	status: OrderStatus;
	totalCents: number;
	createdAt: string;
	itemCount: number;
	hasReview: boolean;
	restaurant: {
		id: string;
		slug: string;
		tradeName: string;
		logoUrls: IImageUrls | null;
	};
}
