import type { IImageUrls } from './IImageUrls';

export interface IProductHit {
	id: string;
	name: string;
	description: string | null;
	priceCents: number;
	imageUrls: IImageUrls | null;
	isAvailable: boolean;
	restaurant: {
		id: string;
		slug: string;
		tradeName: string;
		logoUrls: IImageUrls | null;
	};
}
