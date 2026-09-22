export interface ICreateAddressPayload {
	label?: string;
	zipCode: string;
	street: string;
	number: string;
	complement?: string;
	neighborhood: string;
	city: string;
	state: string;
	reference?: string;
	isDefault?: boolean;
}

export interface IUpdateAddressPayload {
	addressId: string;
	data: Partial<Omit<ICreateAddressPayload, 'isDefault'>>;
}
