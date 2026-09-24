import { act, screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildOrder, buildOrderSummary, buildPayment } from 'tests/fixtures/orders';
import { openOrder } from 'tests/flows';
import { renderApp, seedSession } from 'tests/render';
import { server } from 'tests/server';

const POLL_INTERVAL_MS = 5000;

function createGate() {
	let open = () => {};
	const opened = new Promise<void>((resolve) => {
		open = resolve;
	});

	return { opened, open };
}

describe('Payment', () => {
	beforeEach(async () => {
		await seedSession();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should open the order once the gateway confirms the payment', async () => {
		const paymentCreation = createGate();
		let order = buildOrder({ status: 'PENDING_PAYMENT', paymentMethod: 'ONLINE' });
		server.use(
			http.get(apiUrl('/orders'), () =>
				HttpResponse.json({
					items: [buildOrderSummary({ status: 'PENDING_PAYMENT' })],
					page: 1,
					perPage: 20,
					hasMore: false
				})
			),
			http.get(apiUrl('/orders/order-1'), () => HttpResponse.json(order)),
			http.post(apiUrl('/orders/order-1/payment'), async () => {
				await paymentCreation.opened;

				return HttpResponse.json(buildPayment(), { status: 201 });
			}),
			http.get(apiUrl('/orders/order-1/payment'), () => {
				order = buildOrder({ status: 'PENDING', paymentMethod: 'ONLINE', paymentStatus: 'PAID' });

				return HttpResponse.json(buildPayment({ status: 'PAID' }));
			})
		);
		const { user } = await renderApp();
		await openOrder(user);
		await user.press(await screen.findByRole('button', { name: 'Pagar com Pix' }));
		await screen.findByText('Pague com Pix');

		jest.useFakeTimers();
		await act(async () => {
			paymentCreation.open();
			await jest.advanceTimersByTimeAsync(0);
		});

		expect(screen.getByText('O código expira em', { exact: false })).toBeOnTheScreen();

		await act(() => jest.advanceTimersByTimeAsync(POLL_INTERVAL_MS));

		expect(await screen.findByText('Aguardando confirmação')).toBeOnTheScreen();
		expect(screen.queryByText('Pague com Pix')).not.toBeOnTheScreen();
		expect(screen.getAllByText('Pedido')).toHaveLength(1);
	});
});
