import { api } from 'data/config/api';
import type {
	IConfirmDeliveryPayload,
	IDeliveryOutcome,
	IFailDeliveryPayload
} from 'data/modules/delivery/types/DeliveryTypes';
import type { IDelivery } from 'shared/entities/IDelivery';

async function list(): Promise<IDelivery[]> {
	const { data } = await api.get<IDelivery[]>('/me/deliveries');

	return data;
}

async function confirm({ orderId, code }: IConfirmDeliveryPayload): Promise<IDeliveryOutcome> {
	const { data } = await api.post<IDeliveryOutcome>(`/orders/${orderId}/confirm-delivery`, {
		code
	});

	return data;
}

async function fail({ orderId }: IFailDeliveryPayload): Promise<IDeliveryOutcome> {
	const { data } = await api.post<IDeliveryOutcome>(`/orders/${orderId}/delivery-failed`, {});

	return data;
}

export const DeliveryService = {
	list,
	confirm,
	fail
};
