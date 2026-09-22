import { getApiErrorMessage } from 'data/config/apiError';
import { useSearch } from 'data/modules/discovery/useCases/search/useSearch';
import { useState } from 'react';
import { useDebouncedValue } from 'shared/hooks/useDebouncedValue';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { SearchListState } from './SearchTypes';

const DEBOUNCE_MS = 400;

export function useSearchController() {
	const contentPadding = useScreenPadding();
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS);

	const { foundRestaurants, foundProducts, isSearching, searchError, isQueryTooShort } =
		useSearch(debouncedQuery);

	function resolveListState(): SearchListState {
		if (isQueryTooShort) {
			return 'idle';
		}

		if (isSearching) {
			return 'loading';
		}

		if (searchError) {
			return 'error';
		}

		return 'empty';
	}

	function handleChangeQuery(value: string) {
		setQuery(value);
	}

	return {
		query,
		contentPadding,
		foundRestaurants,
		foundProducts,
		listState: resolveListState(),
		errorMessage: searchError ? getApiErrorMessage(searchError) : '',
		handleChangeQuery
	};
}
