import { useQuery } from '@tanstack/react-query';
import { DISCOVERY_QUERY_KEYS } from 'data/modules/discovery/keys/DiscoveryKeys';
import { DiscoveryService } from 'data/modules/discovery/services/DiscoveryService';

export function useGetRestaurantMenu(restaurantId: string) {
	const { data, isPending, error, refetch } = useQuery({
		queryKey: [DISCOVERY_QUERY_KEYS.GET_RESTAURANT_MENU, restaurantId],
		queryFn: () => DiscoveryService.getRestaurantMenu(restaurantId)
	});

	return {
		menuCategories: data ?? [],
		isLoadingMenu: isPending,
		menuError: error,
		refetchMenu: refetch
	};
}
