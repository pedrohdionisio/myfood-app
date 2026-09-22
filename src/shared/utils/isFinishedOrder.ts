import { FINISHED_ORDER_STATUSES, type OrderStatus } from 'shared/constants/orders';

export function isFinishedOrder(status: OrderStatus) {
	return FINISHED_ORDER_STATUSES.some((finished) => finished === status);
}
