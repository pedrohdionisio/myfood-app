import { screen, within } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildRestaurantSummary } from 'tests/fixtures/restaurants';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

function listRestaurantsBy(search: (params: URLSearchParams) => boolean) {
	const requests: URLSearchParams[] = [];

	server.use(
		http.get(apiUrl('/discovery/restaurants'), ({ request }) => {
			const params = new URL(request.url).searchParams;
			requests.push(params);

			return HttpResponse.json({
				items: search(params)
					? [buildRestaurantSummary({ id: 'restaurant-2', tradeName: 'Sushi Kai' })]
					: [buildRestaurantSummary()],
				page: 1,
				perPage: 20,
				hasMore: false
			});
		})
	);

	return requests;
}

describe('Home', () => {
	beforeEach(async () => {
		await seedSession();
	});

	it('should list the restaurants that deliver to the default address', async () => {
		const requests = listRestaurantsBy(() => false);

		await renderApp();
		await waitForHome();

		expect(
			screen.getByRole('button', { name: 'Entregar em Avenida Paulista, 1000' })
		).toBeOnTheScreen();
		const card = screen.getByRole('button', { name: 'Abrir Cantina da Nonna' });

		expect(within(card).getByText('Italiana')).toBeOnTheScreen();
		expect(within(card).getByText('Entrega R$\u00a07,00')).toBeOnTheScreen();
		expect(requests[0]?.get('addressId')).toBe('address-1');
		expect(requests[0]?.get('includeClosed')).toBe('false');
	});

	it('should search restaurants by name', async () => {
		const requests = listRestaurantsBy((params) => params.get('q') === 'sushi');

		const { user } = await renderApp();
		await waitForHome();
		await user.type(screen.getByLabelText('Buscar restaurante'), 'sushi');

		expect(await screen.findByRole('button', { name: 'Abrir Sushi Kai' })).toBeOnTheScreen();
		expect(requests.filter((params) => params.has('q'))).toHaveLength(1);
	});

	it('should filter by cuisine and clear the filter on a second tap', async () => {
		listRestaurantsBy((params) => params.get('cuisineSlug') === 'japonesa');

		const { user } = await renderApp();
		await waitForHome();
		await user.press(screen.getByRole('button', { name: 'Filtrar por Japonesa' }));

		expect(await screen.findByRole('button', { name: 'Abrir Sushi Kai' })).toBeOnTheScreen();
		expect(
			screen.getByRole('button', { name: 'Filtrar por Japonesa', selected: true })
		).toBeOnTheScreen();

		await user.press(screen.getByRole('button', { name: 'Filtrar por Japonesa' }));

		await waitForHome();
	});

	it('should tell the search found nothing', async () => {
		server.use(
			http.get(apiUrl('/discovery/restaurants'), ({ request }) =>
				HttpResponse.json({
					items: new URL(request.url).searchParams.has('q') ? [] : [buildRestaurantSummary()],
					page: 1,
					perPage: 20,
					hasMore: false
				})
			)
		);

		const { user } = await renderApp();
		await waitForHome();
		await user.type(screen.getByLabelText('Buscar restaurante'), 'xyz');

		expect(await screen.findByText('Nada encontrado')).toBeOnTheScreen();
	});

	it('should tell everything is closed when there is no restaurant at all', async () => {
		server.use(
			http.get(apiUrl('/discovery/restaurants'), () =>
				HttpResponse.json({ items: [], page: 1, perPage: 20, hasMore: false })
			)
		);

		await renderApp();

		expect(await screen.findByText('Tudo fechado por aqui')).toBeOnTheScreen();
	});

	it('should show the API error and load again on retry', async () => {
		server.use(
			http.get(
				apiUrl('/discovery/restaurants'),
				() =>
					HttpResponse.json(
						{ code: 'INTERNAL_ERROR', message: 'Serviço indisponível no momento.' },
						{ status: 500 }
					),
				{ once: true }
			)
		);

		const { user } = await renderApp();

		expect(await screen.findByText('Serviço indisponível no momento.')).toBeOnTheScreen();

		await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

		await waitForHome();
	});

	it('should ask for an address when the customer has none', async () => {
		server.use(
			http.get(apiUrl('/customers/me/addresses'), () => HttpResponse.json([])),
			http.get(apiUrl('/discovery/restaurants'), () =>
				HttpResponse.json(
					{
						code: 'DOMAIN_ERROR',
						message: 'Cadastre um endereço para ver quem entrega até você.',
						details: { reason: 'NO_ADDRESS' }
					},
					{ status: 422 }
				)
			)
		);

		const { user } = await renderApp();

		expect(await screen.findByText('Onde você quer receber?')).toBeOnTheScreen();

		await user.press(screen.getByRole('button', { name: 'Cadastrar endereço' }));

		expect(await screen.findByLabelText('CEP')).toBeOnTheScreen();
	});
});
