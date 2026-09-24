import type { IOrder } from 'shared/entities/IOrder';
import type { IOrderSummary } from 'shared/entities/IOrderSummary';
import type { IPayment } from 'shared/entities/IPayment';

export function buildOrder(overrides: Partial<IOrder> = {}): IOrder {
	return {
		id: 'order-1',
		displayNumber: 42,
		restaurantId: 'restaurant-1',
		status: 'PENDING',
		paymentMethod: 'CASH',
		paymentStatus: 'PENDING',
		changeForCents: null,
		subtotalCents: 8400,
		deliveryFeeCents: 700,
		discountCents: 0,
		totalCents: 9100,
		notes: null,
		deliveryZipCode: '01310100',
		deliveryStreet: 'Avenida Paulista',
		deliveryNumber: '1000',
		deliveryComplement: 'Apto 12',
		deliveryNeighborhood: 'Bela Vista',
		deliveryCity: 'São Paulo',
		deliveryState: 'SP',
		deliveryReference: null,
		cancellationReason: null,
		confirmedAt: null,
		readyAt: null,
		dispatchedAt: null,
		deliveredAt: null,
		finishedAt: null,
		createdAt: '2026-09-24T18:05:00.000Z',
		items: [
			{
				id: 'order-item-1',
				productId: 'product-1',
				productName: 'Lasanha à bolonhesa',
				unitPriceCents: 4200,
				quantity: 2,
				totalCents: 8400,
				notes: null
			}
		],
		deliveryCode: '4821',
		...overrides
	};
}

export function buildOrderSummary(overrides: Partial<IOrderSummary> = {}): IOrderSummary {
	return {
		id: 'order-1',
		displayNumber: 42,
		status: 'PENDING',
		totalCents: 9100,
		createdAt: '2026-09-24T18:05:00.000Z',
		itemCount: 2,
		hasReview: false,
		restaurant: {
			id: 'restaurant-1',
			slug: 'cantina-da-nonna',
			tradeName: 'Cantina da Nonna',
			logoUrls: null
		},
		...overrides
	};
}

export function buildPayment(overrides: Partial<IPayment> = {}): IPayment {
	return {
		id: 'payment-1',
		orderId: 'order-1',
		status: 'PENDING',
		amountCents: 9100,
		brCode: '00020126580014br.gov.bcb.pix0136pix-de-teste',
		receiptUrl: null,
		expiresAt: '2099-01-01T00:00:00.000Z',
		paidAt: null,
		refundedAt: null,
		createdAt: '2026-09-24T18:05:00.000Z',
		...overrides
	};
}
