import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';

export interface ICheckoutAddressCardProps {
	address: ICustomerAddress | null;
	onPress: () => void;
}
