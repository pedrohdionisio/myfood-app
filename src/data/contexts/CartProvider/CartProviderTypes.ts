import type { IMenuProduct } from 'shared/entities/IMenuProduct';
import type { IPublicRestaurant } from 'shared/entities/IPublicRestaurant';

export interface ICartItem {
	product: IMenuProduct;
	quantity: number;
	notes: string | null;
}

export interface ICartRestaurant {
	id: string;
	slug: string;
	tradeName: string;
	deliveryFeeCents: number;
	minOrderCents: number;
}

export interface ICart {
	restaurant: ICartRestaurant;
	items: ICartItem[];
}

export interface IAddCartItemParams {
	restaurant: IPublicRestaurant;
	product: IMenuProduct;
	quantity: number;
	notes: string | null;
}

export interface IRemoveCartItemParams {
	productId: string;
}

export interface ICartContextValue {
	cart: ICart | null;
	itemCount: number;
	subtotalCents: number;
	addCartItem: (params: IAddCartItemParams) => void;
	removeCartItem: (params: IRemoveCartItemParams) => void;
	clearCart: () => void;
}
