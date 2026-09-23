import type { IDelivery } from 'shared/entities/IDelivery';

export interface IDeliveryCustomerCardProps {
	delivery: IDelivery;
	onCallCustomer: () => void;
	onOpenMap: () => void;
}
