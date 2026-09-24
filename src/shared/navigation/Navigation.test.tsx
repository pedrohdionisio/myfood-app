import { screen } from '@testing-library/react-native';
import { AuthTokensManager } from 'data/libs/AuthTokensManager';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildDelivery } from 'tests/fixtures/deliveries';
import { buildCustomer, buildDriver } from 'tests/fixtures/users';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

describe('Navigation', () => {
	it('should open the sign in when there is no stored session', async () => {
		await renderApp();

		expect(await screen.findByRole('button', { name: 'Entrar' })).toBeOnTheScreen();
	});

	it('should restore a stored customer session straight into the home', async () => {
		await seedSession('customer');

		await renderApp();

		await waitForHome();
	});

	it('should restore a stored driver session into the deliveries', async () => {
		await seedSession('driver');
		server.use(
			http.get(apiUrl('/restaurant-users/me'), () => HttpResponse.json(buildDriver())),
			http.get(apiUrl('/me/deliveries'), () => HttpResponse.json([buildDelivery()]))
		);

		await renderApp();

		expect(await screen.findByText('Minhas entregas')).toBeOnTheScreen();
		expect(
			await screen.findByRole('button', { name: 'Abrir entrega do pedido 42' })
		).toBeOnTheScreen();
	});

	it('should renew an expired access token while restoring the session', async () => {
		await seedSession('customer');
		server.use(
			http.get(apiUrl('/customers/me'), ({ request }) =>
				request.headers.get('Authorization') === 'Bearer renewed-token'
					? HttpResponse.json(buildCustomer())
					: new HttpResponse(null, { status: 401 })
			),
			http.post(apiUrl('/auth/customers/refresh'), () =>
				HttpResponse.json({ accessToken: 'renewed-token', idToken: 'id-token', expiresIn: 3600 })
			)
		);

		await renderApp();

		await waitForHome();
		await expect(AuthTokensManager.load()).resolves.toMatchObject({
			accessToken: 'renewed-token',
			refreshToken: 'refresh-token'
		});
	});

	it('should sign out when the API refuses to renew the session', async () => {
		await seedSession('customer');
		server.use(
			http.get(apiUrl('/customers/me'), () => new HttpResponse(null, { status: 401 })),
			http.post(apiUrl('/auth/customers/refresh'), () => new HttpResponse(null, { status: 401 }))
		);

		await renderApp();

		expect(await screen.findByRole('button', { name: 'Entrar' })).toBeOnTheScreen();
		await expect(AuthTokensManager.load()).resolves.toBeNull();
	});

	it('should keep the session and offer a retry when the API is down on boot', async () => {
		await seedSession('customer');
		server.use(
			http.get(apiUrl('/customers/me'), () => new HttpResponse(null, { status: 503 }), {
				once: true
			})
		);

		const { user } = await renderApp();

		expect(await screen.findByText('Não foi possível conectar')).toBeOnTheScreen();
		await expect(AuthTokensManager.load()).resolves.not.toBeNull();

		await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

		await waitForHome();
	});

	it('should let the customer leave when the API stays down', async () => {
		await seedSession('customer');
		server.use(http.get(apiUrl('/customers/me'), () => HttpResponse.error()));

		const { user } = await renderApp();

		await user.press(await screen.findByRole('button', { name: 'Sair da conta' }));

		expect(await screen.findByRole('button', { name: 'Entrar' })).toBeOnTheScreen();
		await expect(AuthTokensManager.load()).resolves.toBeNull();
	});
});
