import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useGetRestaurant } from 'data/modules/discovery/useCases/getRestaurant/useGetRestaurant';
import { useGetRestaurantMenu } from 'data/modules/discovery/useCases/getRestaurantMenu/useGetRestaurantMenu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import type { RestaurantScreenState } from './RestaurantTypes';

export function useRestaurantController() {
	const navigation = useNavigation();
	const { params } = useRoute<RouteProp<AppRoutesParamList, 'Restaurant'>>();
	const { top } = useSafeAreaInsets();
	const { paddingBottom } = useScreenPadding();

	const { restaurant, isLoadingRestaurant, restaurantError, refetchRestaurant } = useGetRestaurant(
		params.slug
	);

	const { menuCategories, isLoadingMenu, menuError, refetchMenu } = useGetRestaurantMenu(
		params.restaurantId
	);

	const error = restaurantError ?? menuError;

	function resolveScreenState(): RestaurantScreenState {
		if (isLoadingRestaurant || isLoadingMenu) {
			return 'loading';
		}

		if (error || !restaurant) {
			return 'error';
		}

		return menuCategories.length > 0 ? 'ready' : 'emptyMenu';
	}

	function handleRetry() {
		refetchRestaurant();
		refetchMenu();
	}

	function handleGoBack() {
		navigation.goBack();
	}

	const screenState = resolveScreenState();

	return {
		restaurant,
		menuCategories,
		topInset: top,
		contentPadding: { paddingBottom },
		screenState,
		shouldShowMenu: screenState === 'ready' || screenState === 'emptyMenu',
		errorMessage: error ? getApiErrorMessage(error) : '',
		handleRetry,
		handleGoBack
	};
}
