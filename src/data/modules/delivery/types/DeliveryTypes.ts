import type { OrderStatus } from 'shared/constants/orders';

export interface IConfirmDeliveryPayload {
	orderId: string;
	code: string;
}

export interface IFailDeliveryPayload {
	orderId: string;
}

export interface IDeliveryOutcome {
	orderId: string;
	status: OrderStatus;
}
