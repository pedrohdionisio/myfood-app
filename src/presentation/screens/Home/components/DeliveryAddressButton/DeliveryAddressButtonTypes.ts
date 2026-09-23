import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';

export interface IDeliveryAddressButtonProps {
	address: ICustomerAddress;
	onPress: () => void;
}
