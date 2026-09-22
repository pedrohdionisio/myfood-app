import { api } from 'data/config/api';
import type {
	IListRestaurantsPayload,
	IListRestaurantsResponse
} from 'data/modules/discovery/types/DiscoveryTypes';
import type { IMenuCategory } from 'shared/entities/IMenuCategory';
import type { IPublicRestaurant } from 'shared/entities/IPublicRestaurant';

async function listRestaurants(
	payload: IListRestaurantsPayload
): Promise<IListRestaurantsResponse> {
	const { data } = await api.get<IListRestaurantsResponse>('/discovery/restaurants', {
		params: payload
	});

	return data;
}

async function getRestaurantBySlug(slug: string): Promise<IPublicRestaurant> {
	const { data } = await api.get<IPublicRestaurant>(`/discovery/restaurants/${slug}`);

	return data;
}

async function getRestaurantMenu(restaurantId: string): Promise<IMenuCategory[]> {
	const { data } = await api.get<IMenuCategory[]>(`/discovery/restaurants/${restaurantId}/menu`);

	return data;
}

export const DiscoveryService = {
	listRestaurants,
	getRestaurantBySlug,
	getRestaurantMenu
};
