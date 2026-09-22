import { api } from 'data/config/api';
import type {
	IListRestaurantsPayload,
	IListRestaurantsResponse
} from 'data/modules/discovery/types/DiscoveryTypes';

async function listRestaurants(
	payload: IListRestaurantsPayload
): Promise<IListRestaurantsResponse> {
	const { data } = await api.get<IListRestaurantsResponse>('/discovery/restaurants', {
		params: payload
	});

	return data;
}

export const DiscoveryService = {
	listRestaurants
};
