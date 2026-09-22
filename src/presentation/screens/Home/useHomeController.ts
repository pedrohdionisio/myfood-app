import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage, getApiErrorReason } from 'data/config/apiError';
import { useListCuisineCategories } from 'data/modules/cuisine/useCases/listCuisineCategories/useListCuisineCategories';
import { useListRestaurants } from 'data/modules/discovery/useCases/listRestaurants/useListRestaurants';
import { useRef, useState } from 'react';
import { useDebouncedValue } from 'shared/hooks/useDebouncedValue';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type {
	IHandleOpenRestaurantParams,
	IHandleSelectCuisineParams,
	IHandleToggleIncludeClosedParams,
	RestaurantsListState
} from './HomeTypes';

const NO_ADDRESS_REASON = 'NO_ADDRESS';
const DEBOUNCE_MS = 400;

export function useHomeController() {
	const navigation = useNavigation();
	const contentPadding = useScreenPadding();
	const filtersSheetRef = useRef<BottomSheetModal>(null);

	const [query, setQuery] = useState('');
	const [selectedCuisineSlug, setSelectedCuisineSlug] = useState<string | null>(null);
	const [includeClosed, setIncludeClosed] = useState(false);
	const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS);

	const { cuisineCategories } = useListCuisineCategories();

	const {
		restaurants,
		isLoadingRestaurants,
		restaurantsError,
		refetchRestaurants,
		fetchMoreRestaurants,
		hasMoreRestaurants,
		isFetchingMoreRestaurants
	} = useListRestaurants({
		term: debouncedQuery,
		cuisineSlug: selectedCuisineSlug,
		includeClosed
	});

	const isFiltering = debouncedQuery.trim().length > 0 || selectedCuisineSlug !== null;
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

		return isFiltering ? 'noResults' : 'empty';
	}

	function handleChangeQuery(value: string) {
		setQuery(value);
	}

	function handleSelectCuisine({ cuisineSlug }: IHandleSelectCuisineParams) {
		setSelectedCuisineSlug((current) => (current === cuisineSlug ? null : cuisineSlug));
	}

	function handleToggleIncludeClosed({ includeClosed: value }: IHandleToggleIncludeClosedParams) {
		setIncludeClosed(value);
	}

	function handleOpenFilters() {
		filtersSheetRef.current?.present();
	}

	function handleRetry() {
		refetchRestaurants();
	}

	function handleOpenRestaurant({ restaurantId, slug }: IHandleOpenRestaurantParams) {
		navigation.navigate('Restaurant', { restaurantId, slug });
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
		cuisineCategories,
		contentPadding,
		filtersSheetRef,
		query,
		selectedCuisineSlug,
		includeClosed,
		hasActiveFilters: includeClosed,
		listState: resolveListState(),
		errorMessage: restaurantsError ? getApiErrorMessage(restaurantsError) : '',
		isFetchingMoreRestaurants,
		handleChangeQuery,
		handleSelectCuisine,
		handleToggleIncludeClosed,
		handleOpenFilters,
		handleOpenRestaurant,
		handleRetry,
		handleGoToAddressForm,
		handleEndReached
	};
}
