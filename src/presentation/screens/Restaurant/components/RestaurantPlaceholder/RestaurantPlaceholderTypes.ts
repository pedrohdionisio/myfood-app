import type { RestaurantScreenState } from '../../RestaurantTypes';

export interface IRestaurantPlaceholderProps {
	screenState: RestaurantScreenState;
	errorMessage: string;
	onRetry: () => void;
}
