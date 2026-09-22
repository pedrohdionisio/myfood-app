import { useQuery } from '@tanstack/react-query';
import { CUISINE_QUERY_KEYS } from 'data/modules/cuisine/keys/CuisineKeys';
import { CuisineService } from 'data/modules/cuisine/services/CuisineService';

const ONE_HOUR_MS = 60 * 60 * 1000;

export function useListCuisineCategories() {
	const { data, isPending } = useQuery({
		queryKey: [CUISINE_QUERY_KEYS.LIST_CUISINE_CATEGORIES],
		queryFn: CuisineService.list,
		staleTime: ONE_HOUR_MS
	});

	return {
		cuisineCategories: data ?? [],
		isLoadingCuisineCategories: isPending
	};
}
