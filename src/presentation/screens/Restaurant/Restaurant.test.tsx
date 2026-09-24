import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { spyOnAlert } from 'tests/alert';
import { apiUrl } from 'tests/apiUrl';
import { buildPublicRestaurant, buildRestaurantSummary } from 'tests/fixtures/restaurants';
import { addProductToCart, openRestaurant } from 'tests/flows';
import { renderApp, seedSession } from 'tests/render';
import { server } from 'tests/server';

describe('Restaurant', () => {
	beforeEach(async () => {
		await seedSession();
	});

	it('should show the menu grouped by category', async () => {
		const { user } = await renderApp();
		await openRestaurant(user);

		expect(await screen.findByText('Massas')).toBeOnTheScreen();
		expect(screen.getByRole('button', { name: 'Adicionar Lasanha à bolonhesa' })).toBeOnTheScreen();
		expect(screen.getByRole('button', { name: 'Adicionar Nhoque ao sugo' })).toBeOnTheScreen();
	});

	it('should add the chosen quantity to the cart and show the subtotal', async () => {
		const { user } = await renderApp();
		await openRestaurant(user);

		await addProductToCart(user, { productName: 'Lasanha à bolonhesa', quantity: 2 });

		expect(await screen.findByRole('button', { name: 'Ver carrinho' })).toHaveTextContent(
			'Ver carrinho2 itens · R$ 84,00'
		);
	});

	it('should ask before replacing a cart that belongs to another restaurant', async () => {
		const sushi = { id: 'restaurant-2', slug: 'sushi-kai', tradeName: 'Sushi Kai' };
		server.use(
			http.get(apiUrl('/discovery/restaurants'), () =>
				HttpResponse.json({
					items: [buildRestaurantSummary(), buildRestaurantSummary(sushi)],
					page: 1,
					perPage: 20,
					hasMore: false
				})
			),
			http.get(apiUrl('/discovery/restaurants/sushi-kai'), () =>
				HttpResponse.json(buildPublicRestaurant(sushi))
			),
			http.get(apiUrl('/discovery/restaurants/restaurant-2/menu'), () =>
				HttpResponse.json([
					{
						id: 'category-2',
						name: 'Temakis',
						products: [
							{
								id: 'product-3',
								name: 'Temaki de salmão',
								description: null,
								priceCents: 3200,
								imageUrls: null,
								isAvailable: true
							}
						]
					}
				])
			)
		);
		const { alertSpy, pressAlertButton } = spyOnAlert();
		const { user } = await renderApp();

		await openRestaurant(user);
		await addProductToCart(user, { productName: 'Lasanha à bolonhesa' });
		await user.press(screen.getByRole('button', { name: 'Voltar' }));
		await openRestaurant(user, 'Sushi Kai');
		await addProductToCart(user, { productName: 'Temaki de salmão' });

		expect(alertSpy).toHaveBeenCalledWith(
			'Começar outro pedido?',
			'Seu carrinho tem itens de Cantina da Nonna. Adicionar daqui esvazia o carrinho.',
			expect.any(Array)
		);
		expect(screen.queryByRole('button', { name: 'Ver carrinho' })).not.toBeOnTheScreen();

		await pressAlertButton('Esvaziar e adicionar');

		expect(await screen.findByRole('button', { name: 'Ver carrinho' })).toHaveTextContent(
			'Ver carrinho1 item · R$ 32,00'
		);
	});

	it('should show the API error and load again on retry', async () => {
		server.use(
			http.get(
				apiUrl('/discovery/restaurants/restaurant-1/menu'),
				() =>
					HttpResponse.json(
						{ code: 'INTERNAL_ERROR', message: 'Cardápio indisponível.' },
						{ status: 500 }
					),
				{ once: true }
			)
		);
		const { user } = await renderApp();
		await openRestaurant(user);

		expect(await screen.findByText('Cardápio indisponível.')).toBeOnTheScreen();

		await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

		expect(await screen.findByText('Massas')).toBeOnTheScreen();
	});
});
