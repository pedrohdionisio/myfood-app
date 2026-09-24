import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import type { IOrder } from 'shared/entities/IOrder';
import { spyOnAlert } from 'tests/alert';
import { apiUrl } from 'tests/apiUrl';
import { buildOrder, buildOrderSummary } from 'tests/fixtures/orders';
import { openOrder } from 'tests/flows';
import { renderApp, seedSession } from 'tests/render';
import { server } from 'tests/server';

function serveOrder(order: IOrder) {
	server.use(
		http.get(apiUrl('/orders'), () =>
			HttpResponse.json({
				items: [buildOrderSummary({ status: order.status })],
				page: 1,
				perPage: 20,
				hasMore: false
			})
		),
		http.get(apiUrl('/orders/order-1'), () => HttpResponse.json(order))
	);
}

describe('Order', () => {
	beforeEach(async () => {
		await seedSession();
	});

	it('should cancel a pending order after the confirmation', async () => {
		serveOrder(buildOrder({ status: 'PENDING' }));
		server.use(
			http.post(apiUrl('/orders/order-1/cancel'), () =>
				HttpResponse.json(buildOrder({ status: 'CANCELED' }))
			)
		);
		const { pressAlertButton } = spyOnAlert();
		const { user } = await renderApp();
		await openOrder(user);

		expect(await screen.findByText('4821')).toBeOnTheScreen();

		await user.press(screen.getByRole('button', { name: 'Cancelar pedido' }));
		await pressAlertButton('Cancelar pedido');

		expect(await screen.findByText('Cancelado')).toBeOnTheScreen();
		expect(screen.queryByText('4821')).not.toBeOnTheScreen();
		expect(screen.queryByRole('button', { name: 'Cancelar pedido' })).not.toBeOnTheScreen();
	});

	it('should keep the order when the customer gives up canceling', async () => {
		serveOrder(buildOrder({ status: 'PENDING' }));
		const { pressAlertButton } = spyOnAlert();
		const { user } = await renderApp();
		await openOrder(user);

		await user.press(await screen.findByRole('button', { name: 'Cancelar pedido' }));
		await pressAlertButton('Voltar');

		expect(screen.getByText('Aguardando confirmação')).toBeOnTheScreen();
	});

	it('should not offer canceling once the restaurant confirmed', async () => {
		serveOrder(buildOrder({ status: 'CONFIRMED' }));
		const { user } = await renderApp();
		await openOrder(user);

		expect(await screen.findByText('Confirmado')).toBeOnTheScreen();
		expect(screen.getByText('4821')).toBeOnTheScreen();
		expect(screen.queryByRole('button', { name: 'Cancelar pedido' })).not.toBeOnTheScreen();
	});

	it('should review a delivered order', async () => {
		serveOrder(buildOrder({ status: 'DELIVERED' }));
		const reviewBodies: unknown[] = [];
		server.use(
			http.get(apiUrl('/orders/order-1/review'), () =>
				HttpResponse.json(
					{ code: 'NOT_FOUND', message: 'Avaliação não encontrada' },
					{ status: 404 }
				)
			),
			http.post(apiUrl('/orders/order-1/review'), async ({ request }) => {
				reviewBodies.push(await request.json());

				return HttpResponse.json(
					{
						id: 'review-1',
						orderId: 'order-1',
						restaurantId: 'restaurant-1',
						rating: 4,
						comment: 'Chegou quentinho',
						reply: null,
						repliedAt: null,
						createdAt: '2026-09-24T19:00:00.000Z'
					},
					{ status: 201 }
				);
			})
		);
		const { user } = await renderApp();
		await openOrder(user);

		expect(await screen.findByText('Entregue')).toBeOnTheScreen();
		expect(screen.queryByText('4821')).not.toBeOnTheScreen();

		await user.press(await screen.findByRole('button', { name: 'Avaliar pedido' }));
		await user.press(screen.getByRole('button', { name: 'Enviar avaliação' }));

		expect(await screen.findByText('Escolha uma nota de 1 a 5')).toBeOnTheScreen();

		await user.press(screen.getByRole('radio', { name: 'Nota 4: Bom' }));
		await user.type(screen.getByLabelText('Comentário (opcional)'), 'Chegou quentinho');
		await user.press(screen.getByRole('button', { name: 'Enviar avaliação' }));

		expect(await screen.findByText('Sua avaliação')).toBeOnTheScreen();
		expect(reviewBodies).toEqual([{ rating: 4, comment: 'Chegou quentinho' }]);
	});
});
