import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';

export interface IAddressCardProps {
	address: ICustomerAddress;
	onSetDefault: () => void;
	onEdit: () => void;
	onDelete: () => void;
}
