import { screen } from '@testing-library/react-native';
import * as Clipboard from 'expo-clipboard';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildOrder, buildPayment } from 'tests/fixtures/orders';
import { buildPublicRestaurant } from 'tests/fixtures/restaurants';
import { addProductToCart, goToCheckout, openRestaurant } from 'tests/flows';
import { renderApp, seedSession } from 'tests/render';
import { server } from 'tests/server';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

interface ICreatedOrderRequest {
	idempotencyKey: string | null;
	body: unknown;
}

function acceptOrders(order = buildOrder()) {
	const requests: ICreatedOrderRequest[] = [];

	server.use(
		http.post(apiUrl('/orders'), async ({ request }) => {
			requests.push({
				idempotencyKey: request.headers.get('Idempotency-Key'),
				body: await request.json()
			});

			return HttpResponse.json(order, { status: 201 });
		}),
		http.get(apiUrl(`/orders/${order.id}`), () => HttpResponse.json(order))
	);

	return requests;
}

async function renderCheckout() {
	const rendered = await renderApp();

	await openRestaurant(rendered.user);
	await addProductToCart(rendered.user, {
		productName: 'Lasanha à bolonhesa',
		quantity: 2,
		notes: 'Sem queijo'
	});
	await goToCheckout(rendered.user);

	return rendered;
}

describe('Checkout', () => {
	beforeEach(async () => {
		await seedSession();
	});

	it('should place a cash order with change and open it with the delivery code', async () => {
		const requests = acceptOrders();
		const { user } = await renderCheckout();

		expect(screen.getByText('R$ 91,00')).toBeOnTheScreen();

		await user.press(screen.getByRole('button', { name: 'Dinheiro na entrega' }));
		await user.type(screen.getByLabelText('Troco para quanto'), '100');
		await user.type(screen.getByLabelText('Observação do pedido'), 'Interfone quebrado');
		await user.press(screen.getByRole('button', { name: 'Fazer pedido' }));

		expect(await screen.findByText('4821')).toBeOnTheScreen();
		expect(screen.getByText('Aguardando confirmação')).toBeOnTheScreen();
		expect(requests).toEqual([
			{
				idempotencyKey: expect.stringMatching(UUID_PATTERN),
				body: {
					restaurantId: 'restaurant-1',
					addressId: 'address-1',
					paymentMethod: 'CASH',
					changeForCents: 10000,
					notes: 'Interfone quebrado',
					items: [{ productId: 'product-1', quantity: 2, notes: 'Sem queijo' }]
				}
			}
		]);
	});

	it('should send a retry with the same idempotency key', async () => {
		const requests: (string | null)[] = [];
		server.use(
			http.post(apiUrl('/orders'), ({ request }) => {
				requests.push(request.headers.get('Idempotency-Key'));

				return requests.length === 1
					? HttpResponse.json(
							{ code: 'INTERNAL_ERROR', message: 'Não foi possível criar o pedido.' },
							{ status: 500 }
						)
					: HttpResponse.json(buildOrder(), { status: 201 });
			}),
			http.get(apiUrl('/orders/order-1'), () => HttpResponse.json(buildOrder()))
		);
		const { user } = await renderCheckout();

		await user.press(screen.getByRole('button', { name: 'Dinheiro na entrega' }));
		await user.press(screen.getByRole('button', { name: 'Fazer pedido' }));

		expect(await screen.findByText('Não foi possível criar o pedido.')).toBeOnTheScreen();

		await user.press(screen.getByRole('button', { name: 'Fazer pedido' }));

		expect(await screen.findByText('4821')).toBeOnTheScreen();
		expect(requests).toHaveLength(2);
		expect(requests[1]).toBe(requests[0]);
	});

	it('should take a Pix order to the payment and copy the code', async () => {
		const setStringSpy = jest.spyOn(Clipboard, 'setStringAsync').mockResolvedValue(true);
		const requests = acceptOrders(
			buildOrder({ status: 'PENDING_PAYMENT', paymentMethod: 'ONLINE' })
		);
		server.use(
			http.post(apiUrl('/orders/order-1/payment'), () =>
				HttpResponse.json(buildPayment(), { status: 201 })
			),
			http.get(apiUrl('/orders/order-1/payment'), () => HttpResponse.json(buildPayment()))
		);
		const { user } = await renderCheckout();

		await user.press(screen.getByRole('button', { name: 'Fazer pedido' }));

		expect(await screen.findByText('Pague com Pix')).toBeOnTheScreen();
		expect(await screen.findByText('R$ 91,00')).toBeOnTheScreen();
		expect(requests[0]?.body).toMatchObject({ paymentMethod: 'ONLINE' });

		await user.press(screen.getByRole('button', { name: 'Copiar código' }));

		expect(setStringSpy).toHaveBeenCalledWith(buildPayment().brCode);
		expect(screen.getByRole('button', { name: 'Código copiado' })).toBeOnTheScreen();
	});

	it('should block an order below the restaurant minimum', async () => {
		server.use(
			http.get(apiUrl('/discovery/restaurants/cantina-da-nonna'), () =>
				HttpResponse.json(buildPublicRestaurant({ minOrderCents: 10000 }))
			)
		);
		await renderCheckout();

		expect(screen.getByText('O pedido mínimo deste restaurante é R$ 100,00.')).toBeOnTheScreen();
		expect(screen.getByRole('button', { name: 'Fazer pedido' })).toBeDisabled();
	});

	it('should empty the checkout when the last item is removed', async () => {
		const { user } = await renderCheckout();

		await user.press(screen.getByRole('button', { name: 'Remover Lasanha à bolonhesa' }));

		expect(await screen.findByText('Carrinho vazio')).toBeOnTheScreen();
	});
});
