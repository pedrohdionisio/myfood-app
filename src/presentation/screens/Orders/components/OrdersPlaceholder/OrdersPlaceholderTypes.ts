import type { OrdersListState } from '../../OrdersTypes';

export interface IOrdersPlaceholderProps {
	listState: OrdersListState;
	errorMessage: string;
	onRetry: () => void;
}
