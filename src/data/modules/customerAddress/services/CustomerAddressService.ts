import { api } from 'data/config/api';
import type {
	ICreateAddressPayload,
	IUpdateAddressPayload
} from 'data/modules/customerAddress/types/CustomerAddressTypes';
import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';

async function list(): Promise<ICustomerAddress[]> {
	const { data } = await api.get<ICustomerAddress[]>('/customers/me/addresses');

	return data;
}

async function create(payload: ICreateAddressPayload): Promise<ICustomerAddress> {
	const { data } = await api.post<ICustomerAddress>('/customers/me/addresses', payload);

	return data;
}

async function update({ addressId, data: body }: IUpdateAddressPayload): Promise<ICustomerAddress> {
	const { data } = await api.patch<ICustomerAddress>(`/customers/me/addresses/${addressId}`, body);

	return data;
}

async function setDefault(addressId: string): Promise<ICustomerAddress> {
	const { data } = await api.patch<ICustomerAddress>(
		`/customers/me/addresses/${addressId}/default`
	);

	return data;
}

async function remove(addressId: string): Promise<ICustomerAddress[]> {
	const { data } = await api.delete<ICustomerAddress[]>(`/customers/me/addresses/${addressId}`);

	return data;
}

export const CustomerAddressService = {
	list,
	create,
	update,
	setDefault,
	remove
};
