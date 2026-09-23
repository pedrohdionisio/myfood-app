import type { IDelivery } from 'shared/entities/IDelivery';

export function formatDeliveryAddress(delivery: IDelivery) {
	const complement = delivery.deliveryComplement ? ` - ${delivery.deliveryComplement}` : '';

	return `${delivery.deliveryStreet}, ${delivery.deliveryNumber}${complement} · ${delivery.deliveryNeighborhood}, ${delivery.deliveryCity} - ${delivery.deliveryState}`;
}
