import { useQuery } from '@tanstack/react-query';
import { DISCOVERY_QUERY_KEYS } from 'data/modules/discovery/keys/DiscoveryKeys';
import { DiscoveryService } from 'data/modules/discovery/services/DiscoveryService';

export function useGetRestaurant(slug: string) {
	const { data, isPending, error, refetch } = useQuery({
		queryKey: [DISCOVERY_QUERY_KEYS.GET_RESTAURANT, slug],
		queryFn: () => DiscoveryService.getRestaurantBySlug(slug)
	});

	return {
		restaurant: data ?? null,
		isLoadingRestaurant: isPending,
		restaurantError: error,
		refetchRestaurant: refetch
	};
}
