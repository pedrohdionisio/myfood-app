import { api } from 'data/config/api';
import type { IPayment } from 'shared/entities/IPayment';

async function createPix(orderId: string): Promise<IPayment> {
	const { data } = await api.post<IPayment>(`/orders/${orderId}/payment`);

	return data;
}

async function getByOrder(orderId: string): Promise<IPayment> {
	const { data } = await api.get<IPayment>(`/orders/${orderId}/payment`);

	return data;
}

export const PaymentService = {
	createPix,
	getByOrder
};
