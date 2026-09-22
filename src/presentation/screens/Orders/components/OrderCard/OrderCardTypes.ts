import type { IOrderSummary } from 'shared/entities/IOrderSummary';

export interface IOrderCardProps {
	order: IOrderSummary;
	onPress: () => void;
}
