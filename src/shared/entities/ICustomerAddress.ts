export interface ICustomerAddress {
	id: string;
	label: string | null;
	zipCode: string;
	street: string;
	number: string;
	complement: string | null;
	neighborhood: string;
	city: string;
	state: string;
	reference: string | null;
	isDefault: boolean;
}
