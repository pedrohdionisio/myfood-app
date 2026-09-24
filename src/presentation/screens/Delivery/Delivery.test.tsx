import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { spyOnAlert } from 'tests/alert';
import { apiUrl } from 'tests/apiUrl';
import { buildDelivery } from 'tests/fixtures/deliveries';
import { buildDriver } from 'tests/fixtures/users';
import { renderApp, seedSession } from 'tests/render';
import { server } from 'tests/server';

function serveDeliveries() {
	let isDelivered = false;

	server.use(
		http.get(apiUrl('/restaurant-users/me'), () => HttpResponse.json(buildDriver())),
		http.get(apiUrl('/me/deliveries'), () =>
			HttpResponse.json(isDelivered ? [] : [buildDelivery({ changeForCents: 10000 })])
		)
	);

	return {
		markDelivered() {
			isDelivered = true;
		}
	};
}

async function openDelivery() {
	await seedSession('driver');
	const rendered = await renderApp();

	await rendered.user.press(
		await screen.findByRole('button', { name: 'Abrir entrega do pedido 42' })
	);
	await screen.findByText('Entrega #42');

	return rendered;
}

describe('Delivery', () => {
	it('should tell the driver how much to charge and the change to bring', async () => {
		serveDeliveries();
		await openDelivery();

		expect(
			screen.getByText(
				'Cobre R$ 54,90 em dinheiro. O cliente vai pagar com R$ 100,00: leve R$ 45,10 de troco.'
			)
		).toBeOnTheScreen();
	});

	it('should confirm the delivery with the customer code', async () => {
		const deliveries = serveDeliveries();
		server.use(
			http.post<never, { code: string }>(
				apiUrl('/orders/order-1/confirm-delivery'),
				async ({ request }) => {
					const { code } = await request.json();

					if (code !== '4821') {
						return HttpResponse.json(
							{ code: 'DOMAIN_ERROR', message: 'Código de entrega incorreto.' },
							{ status: 422 }
						);
					}

					deliveries.markDelivered();

					return HttpResponse.json({ orderId: 'order-1', status: 'DELIVERED' });
				}
			)
		);
		const { alertSpy } = spyOnAlert();
		const { user } = await openDelivery();

		await user.type(screen.getByLabelText('Código de entrega'), '1111');
		await user.press(screen.getByRole('button', { name: 'Confirmar entrega' }));

		expect(await screen.findByText('Código de entrega incorreto.')).toBeOnTheScreen();

		await user.clear(screen.getByLabelText('Código de entrega'));
		await user.type(screen.getByLabelText('Código de entrega'), '4821');
		await user.press(screen.getByRole('button', { name: 'Confirmar entrega' }));

		expect(await screen.findByText('Nenhuma entrega em rota')).toBeOnTheScreen();
		expect(alertSpy).toHaveBeenCalledWith(
			'Entrega confirmada',
			'O pedido foi marcado como entregue.'
		);
	});

	it('should register a failed delivery after the confirmation', async () => {
		const deliveries = serveDeliveries();
		server.use(
			http.post(apiUrl('/orders/order-1/delivery-failed'), () => {
				deliveries.markDelivered();

				return HttpResponse.json({ orderId: 'order-1', status: 'DELIVERY_FAILED' });
			})
		);
		const { pressAlertButton } = spyOnAlert();
		const { user } = await openDelivery();

		await user.press(screen.getByRole('button', { name: 'Entrega frustrada' }));
		await pressAlertButton('Registrar');

		expect(await screen.findByText('Nenhuma entrega em rota')).toBeOnTheScreen();
	});
});
