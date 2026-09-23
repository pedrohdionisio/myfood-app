import type { IDelivery } from 'shared/entities/IDelivery';

export interface IDeliveryCardProps {
	delivery: IDelivery;
	onPress: () => void;
}
