import type { AddressFormType } from 'data/modules/customerAddress/schemas/addressFormSchema';
import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';

export function toFormValues(address: ICustomerAddress | null): AddressFormType {
	return {
		label: address?.label ?? '',
		zipCode: address?.zipCode ?? '',
		street: address?.street ?? '',
		number: address?.number ?? '',
		complement: address?.complement ?? '',
		neighborhood: address?.neighborhood ?? '',
		city: address?.city ?? '',
		state: address?.state ?? '',
		reference: address?.reference ?? ''
	};
}
