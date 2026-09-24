import type { IDelivery } from 'shared/entities/IDelivery';

export function buildDelivery(overrides: Partial<IDelivery> = {}): IDelivery {
	return {
		id: 'order-1',
		displayNumber: 42,
		status: 'OUT_FOR_DELIVERY',
		restaurantId: 'restaurant-1',
		restaurantTradeName: 'Cantina da Nonna',
		customerName: 'Ana Souza',
		customerPhone: '11987654321',
		deliveryZipCode: '01310100',
		deliveryStreet: 'Avenida Paulista',
		deliveryNumber: '1000',
		deliveryComplement: 'Apto 12',
		deliveryNeighborhood: 'Bela Vista',
		deliveryCity: 'São Paulo',
		deliveryState: 'SP',
		deliveryReference: null,
		paymentMethod: 'CASH',
		totalCents: 5490,
		changeForCents: null,
		itemCount: 2,
		dispatchedAt: '2026-09-24T18:30:00.000Z',
		...overrides
	};
}
