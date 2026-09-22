import type { IImageUrls } from './IImageUrls';

export interface IMenuProduct {
	id: string;
	name: string;
	description: string | null;
	priceCents: number;
	imageUrls: IImageUrls | null;
	isAvailable: boolean;
}
