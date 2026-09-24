import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { openRestaurant } from 'tests/flows';
import { renderApp, seedSession } from 'tests/render';
import { server } from 'tests/server';

describe('RestaurantReviews', () => {
	it('should open the reviews from the rating and page through them', async () => {
		const pages: string[] = [];
		server.use(
			http.get(apiUrl('/discovery/restaurants/cantina-da-nonna/reviews'), ({ request }) => {
				const page = new URL(request.url).searchParams.get('page') ?? '';
				pages.push(page);

				return HttpResponse.json({
					items: [
						{
							id: `review-${page}`,
							rating: 5,
							comment: page === '1' ? 'Melhor lasanha da região' : 'Nhoque perfeito',
							reply: page === '1' ? 'Obrigado, volte sempre!' : null,
							repliedAt: null,
							createdAt: '2026-09-20T20:00:00.000Z',
							customerFirstName: page === '1' ? 'Carla' : 'Diego'
						}
					],
					page: Number(page),
					perPage: 1,
					hasMore: page === '1'
				});
			})
		);
		await seedSession();
		const { user } = await renderApp();
		await openRestaurant(user);

		await user.press(await screen.findByRole('button', { name: '4.6 18 avaliações' }));

		expect(await screen.findByText('Avaliações de Cantina da Nonna')).toBeOnTheScreen();
		expect(await screen.findByText('Melhor lasanha da região')).toBeOnTheScreen();
		expect(screen.getByText('Obrigado, volte sempre!')).toBeOnTheScreen();
		expect(screen.getByLabelText('Nota 5 de 5')).toBeOnTheScreen();
		expect(pages[0]).toBe('1');
	});
});
