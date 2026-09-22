import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage, getApiErrorReason } from 'data/config/apiError';
import { useListRestaurants } from 'data/modules/discovery/useCases/listRestaurants/useListRestaurants';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { RestaurantsListState } from './HomeTypes';

const NO_ADDRESS_REASON = 'NO_ADDRESS';

export function useHomeController() {
	const navigation = useNavigation();
	const contentPadding = useScreenPadding();

	const {
		restaurants,
		isLoadingRestaurants,
		restaurantsError,
		refetchRestaurants,
		fetchMoreRestaurants,
		hasMoreRestaurants,
		isFetchingMoreRestaurants
	} = useListRestaurants();

	const isMissingAddress = getApiErrorReason(restaurantsError) === NO_ADDRESS_REASON;

	function resolveListState(): RestaurantsListState {
		if (isLoadingRestaurants) {
			return 'loading';
		}

		if (isMissingAddress) {
			return 'missingAddress';
		}

		if (restaurantsError) {
			return 'error';
		}

		return 'empty';
	}

	function handleRetry() {
		refetchRestaurants();
	}

	function handleGoToAddressForm() {
		navigation.navigate('AddressForm', {});
	}

	function handleEndReached() {
		if (hasMoreRestaurants && !isFetchingMoreRestaurants) {
			fetchMoreRestaurants();
		}
	}

	return {
		restaurants,
		contentPadding,
		listState: resolveListState(),
		errorMessage: restaurantsError ? getApiErrorMessage(restaurantsError) : '',
		isFetchingMoreRestaurants,
		handleRetry,
		handleGoToAddressForm,
		handleEndReached
	};
}
