import type { RestaurantReviewsListState } from '../../RestaurantReviewsTypes';

export interface IRestaurantReviewsPlaceholderProps {
	listState: RestaurantReviewsListState;
	errorMessage: string;
	onRetry: () => void;
}
