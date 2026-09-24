import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';

export function buildCustomerAddress(overrides: Partial<ICustomerAddress> = {}): ICustomerAddress {
	return {
		id: 'address-1',
		label: 'Casa',
		zipCode: '01310100',
		street: 'Avenida Paulista',
		number: '1000',
		complement: 'Apto 12',
		neighborhood: 'Bela Vista',
		city: 'São Paulo',
		state: 'SP',
		reference: null,
		isDefault: true,
		...overrides
	};
}
