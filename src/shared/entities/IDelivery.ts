import type { OrderStatus, PaymentMethod } from 'shared/constants/orders';

export interface IDelivery {
	id: string;
	displayNumber: number;
	status: OrderStatus;
	restaurantId: string;
	restaurantTradeName: string;
	customerName: string;
	customerPhone: string | null;
	deliveryZipCode: string;
	deliveryStreet: string;
	deliveryNumber: string;
	deliveryComplement: string | null;
	deliveryNeighborhood: string;
	deliveryCity: string;
	deliveryState: string;
	deliveryReference: string | null;
	paymentMethod: PaymentMethod;
	totalCents: number | null;
	changeForCents: number | null;
	itemCount: number;
	dispatchedAt: string | null;
}
