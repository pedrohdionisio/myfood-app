import type { RestaurantsListState } from '../../HomeTypes';

export interface IRestaurantsPlaceholderProps {
	listState: RestaurantsListState;
	errorMessage: string;
	onRetry: () => void;
	onAddAddress: () => void;
}
