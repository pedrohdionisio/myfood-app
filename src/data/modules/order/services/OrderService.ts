import { api } from 'data/config/api';
import type {
	ICancelOrderPayload,
	ICreateOrderPayload,
	IListOrdersPayload,
	IListOrdersResponse
} from 'data/modules/order/types/OrderTypes';
import type { IOrder } from 'shared/entities/IOrder';

async function create({ idempotencyKey, ...body }: ICreateOrderPayload): Promise<IOrder> {
	const { data } = await api.post<IOrder>('/orders', body, {
		headers: { 'Idempotency-Key': idempotencyKey }
	});

	return data;
}

async function list(payload: IListOrdersPayload): Promise<IListOrdersResponse> {
	const { data } = await api.get<IListOrdersResponse>('/orders', { params: payload });

	return data;
}

async function getById(orderId: string): Promise<IOrder> {
	const { data } = await api.get<IOrder>(`/orders/${orderId}`);

	return data;
}

async function cancel({ orderId, reason }: ICancelOrderPayload): Promise<IOrder> {
	const { data } = await api.post<IOrder>(`/orders/${orderId}/cancel`, { reason });

	return data;
}

export const OrderService = {
	create,
	list,
	getById,
	cancel
};
