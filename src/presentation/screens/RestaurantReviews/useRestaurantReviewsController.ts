import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useListRestaurantReviews } from 'data/modules/review/useCases/listRestaurantReviews/useListRestaurantReviews';
import { usePullToRefresh } from 'shared/hooks/usePullToRefresh';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import type { RestaurantReviewsListState } from './RestaurantReviewsTypes';

export function useRestaurantReviewsController() {
	const navigation = useNavigation();
	const { params } = useRoute<RouteProp<AppRoutesParamList, 'RestaurantReviews'>>();
	const contentPadding = useScreenPadding();

	const {
		reviews,
		isLoadingReviews,
		reviewsError,
		refetchReviews,
		fetchMoreReviews,
		hasMoreReviews,
		isFetchingMoreReviews
	} = useListRestaurantReviews(params.slug);
	const { isRefreshing, handleRefresh } = usePullToRefresh(refetchReviews);

	function resolveListState(): RestaurantReviewsListState {
		if (isLoadingReviews) {
			return 'loading';
		}

		if (reviewsError) {
			return 'error';
		}

		return 'empty';
	}

	function handleGoBack() {
		navigation.goBack();
	}

	function handleRetry() {
		refetchReviews();
	}

	function handleEndReached() {
		if (hasMoreReviews && !isFetchingMoreReviews) {
			fetchMoreReviews();
		}
	}

	return {
		tradeName: params.tradeName,
		reviews,
		contentPadding,
		listState: resolveListState(),
		errorMessage: reviewsError ? getApiErrorMessage(reviewsError) : '',
		isFetchingMoreReviews,
		isRefreshing,
		handleGoBack,
		handleRetry,
		handleEndReached,
		handleRefresh
	};
}
