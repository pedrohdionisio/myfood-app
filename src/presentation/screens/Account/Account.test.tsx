import { screen, waitFor } from '@testing-library/react-native';
import { AuthTokensManager } from 'data/libs/AuthTokensManager';
import { PushNotificationsManager } from 'data/libs/PushNotificationsManager';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

async function openAccount() {
	await seedSession();
	const rendered = await renderApp();

	await waitForHome();
	await rendered.user.press(screen.getByRole('tab', { name: 'Conta' }));
	await screen.findByRole('button', { name: 'Sair' });

	return rendered;
}

describe('Account', () => {
	it('should update the name and phone of the customer', async () => {
		const bodies: unknown[] = [];
		server.use(
			http.patch(apiUrl('/customers/me'), async ({ request }) => {
				bodies.push(await request.json());

				return HttpResponse.json({ name: 'Ana Paula Souza', phone: null });
			})
		);
		const { user } = await openAccount();

		await user.press(screen.getByRole('button', { name: 'Editar perfil' }));

		expect(await screen.findByLabelText('Telefone (opcional)')).toHaveDisplayValue(
			'(11) 98765-4321'
		);

		await user.clear(screen.getByLabelText('Nome'));
		await user.type(screen.getByLabelText('Nome'), 'Ana Paula Souza');
		await user.clear(screen.getByLabelText('Telefone (opcional)'));
		await user.press(screen.getByRole('button', { name: 'Salvar' }));

		expect(await screen.findByText('Ana Paula Souza')).toBeOnTheScreen();
		expect(bodies).toEqual([{ name: 'Ana Paula Souza', phone: null }]);
	});

	it('should remove the push token before ending the session on sign out', async () => {
		jest
			.spyOn(PushNotificationsManager, 'getDevicePushToken')
			.mockResolvedValue({ token: 'ExponentPushToken[device]', platform: 'IOS' });
		const pushTokenCalls: string[] = [];
		server.use(
			http.post(apiUrl('/me/push-tokens'), async ({ request }) => {
				pushTokenCalls.push(`register ${JSON.stringify(await request.json())}`);

				return new HttpResponse(null, { status: 204 });
			}),
			http.delete(apiUrl('/me/push-tokens'), async ({ request }) => {
				pushTokenCalls.push(
					`unregister ${JSON.stringify(await request.json())} ${request.headers.get('Authorization')}`
				);

				return new HttpResponse(null, { status: 204 });
			})
		);
		const { user } = await openAccount();

		await waitFor(() => expect(pushTokenCalls).toHaveLength(1));
		await user.press(screen.getByRole('button', { name: 'Sair' }));

		expect(await screen.findByRole('button', { name: 'Entrar' })).toBeOnTheScreen();
		expect(pushTokenCalls).toEqual([
			'register {"token":"ExponentPushToken[device]","platform":"IOS"}',
			'unregister {"token":"ExponentPushToken[device]"} Bearer access-token'
		]);
		await expect(AuthTokensManager.load()).resolves.toBeNull();
	});
});
