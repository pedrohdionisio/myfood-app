import type { IMenuCategory } from 'shared/entities/IMenuCategory';
import type { IMenuProduct } from 'shared/entities/IMenuProduct';
import type { IPublicRestaurant } from 'shared/entities/IPublicRestaurant';
import type { IRestaurantSummary } from 'shared/entities/IRestaurantSummary';

export function buildRestaurantSummary(
	overrides: Partial<IRestaurantSummary> = {}
): IRestaurantSummary {
	return {
		id: 'restaurant-1',
		slug: 'cantina-da-nonna',
		tradeName: 'Cantina da Nonna',
		description: 'Massas frescas',
		logoUrls: null,
		bannerUrls: null,
		city: 'São Paulo',
		state: 'SP',
		deliveryFeeCents: 700,
		minOrderCents: 2000,
		avgPrepTimeMin: 30,
		isAcceptingOrders: true,
		isOpenNow: true,
		cuisines: [{ id: 'cuisine-1', slug: 'italiana', name: 'Italiana' }],
		ratingAvg: 4.6,
		ratingCount: 18,
		...overrides
	};
}

export function buildPublicRestaurant(
	overrides: Partial<IPublicRestaurant> = {}
): IPublicRestaurant {
	return {
		...buildRestaurantSummary(),
		neighborhood: 'Bela Vista',
		openingHours: [],
		...overrides
	};
}

export function buildMenuProduct(overrides: Partial<IMenuProduct> = {}): IMenuProduct {
	return {
		id: 'product-1',
		name: 'Lasanha à bolonhesa',
		description: 'Molho de tomate e carne',
		priceCents: 4200,
		imageUrls: null,
		isAvailable: true,
		...overrides
	};
}

export function buildMenu(): IMenuCategory[] {
	return [
		{
			id: 'category-1',
			name: 'Massas',
			products: [
				buildMenuProduct(),
				buildMenuProduct({ id: 'product-2', name: 'Nhoque ao sugo', priceCents: 3600 })
			]
		}
	];
}
