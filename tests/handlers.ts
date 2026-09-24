import { HttpResponse, http } from 'msw';
import { apiUrl } from './apiUrl';
import { buildCustomerAddress } from './fixtures/addresses';
import { buildCuisineCategories } from './fixtures/cuisines';
import { buildMenu, buildPublicRestaurant, buildRestaurantSummary } from './fixtures/restaurants';
import { buildCustomer } from './fixtures/users';

export const defaultHandlers = [
	http.get(apiUrl('/customers/me'), () => HttpResponse.json(buildCustomer())),
	http.get(apiUrl('/customers/me/addresses'), () => HttpResponse.json([buildCustomerAddress()])),
	http.get(apiUrl('/cuisine-categories'), () => HttpResponse.json(buildCuisineCategories())),
	http.get(apiUrl('/discovery/restaurants'), () =>
		HttpResponse.json({ items: [buildRestaurantSummary()], page: 1, perPage: 20, hasMore: false })
	),
	http.get(apiUrl('/discovery/restaurants/cantina-da-nonna'), () =>
		HttpResponse.json(buildPublicRestaurant())
	),
	http.get(apiUrl('/discovery/restaurants/restaurant-1/menu'), () => HttpResponse.json(buildMenu()))
];
