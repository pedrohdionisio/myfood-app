import type { PaymentMethod } from 'shared/constants/orders';
import type { IOrderSummary } from 'shared/entities/IOrderSummary';

export interface ICreateOrderItemPayload {
	productId: string;
	quantity: number;
	notes?: string;
}

export interface ICreateOrderPayload {
	idempotencyKey: string;
	restaurantId: string;
	addressId: string;
	paymentMethod: PaymentMethod;
	changeForCents?: number;
	notes?: string;
	items: ICreateOrderItemPayload[];
}

export interface IListOrdersPayload {
	page: number;
}

export interface IListOrdersResponse {
	items: IOrderSummary[];
	page: number;
	perPage: number;
	hasMore: boolean;
}

export interface ICancelOrderPayload {
	orderId: string;
	reason?: string;
}
