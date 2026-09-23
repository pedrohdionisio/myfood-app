import type { DeliveriesListState } from '../../DeliveriesTypes';

export interface IDeliveriesPlaceholderProps {
	listState: DeliveriesListState;
	errorMessage: string;
	onRetry: () => void;
}
