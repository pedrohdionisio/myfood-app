import type { OrderStatus, PaymentMethod, PaymentStatus } from 'shared/constants/orders';
import type { IOrderItem } from './IOrderItem';

export interface IOrder {
	id: string;
	displayNumber: number;
	restaurantId: string;
	status: OrderStatus;
	paymentMethod: PaymentMethod;
	paymentStatus: PaymentStatus;
	changeForCents: number | null;
	subtotalCents: number;
	deliveryFeeCents: number;
	discountCents: number;
	totalCents: number;
	notes: string | null;
	deliveryZipCode: string;
	deliveryStreet: string;
	deliveryNumber: string;
	deliveryComplement: string | null;
	deliveryNeighborhood: string;
	deliveryCity: string;
	deliveryState: string;
	deliveryReference: string | null;
	cancellationReason: string | null;
	confirmedAt: string | null;
	readyAt: string | null;
	dispatchedAt: string | null;
	deliveredAt: string | null;
	finishedAt: string | null;
	createdAt: string;
	items: IOrderItem[];
	deliveryCode: string;
}
