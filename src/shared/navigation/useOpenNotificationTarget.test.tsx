import { act, screen } from '@testing-library/react-native';
import * as Notifications from 'expo-notifications';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildDelivery } from 'tests/fixtures/deliveries';
import { buildNotificationResponse } from 'tests/fixtures/notifications';
import { buildOrder } from 'tests/fixtures/orders';
import { buildDriver } from 'tests/fixtures/users';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

describe('useOpenNotificationTarget', () => {
	it('should open the order of the notification that launched the app', async () => {
		jest
			.mocked(Notifications.getLastNotificationResponseAsync)
			.mockResolvedValueOnce(buildNotificationResponse({ orderId: 'order-1' }));
		server.use(http.get(apiUrl('/orders/order-1'), () => HttpResponse.json(buildOrder())));
		await seedSession();

		await renderApp();

		expect(await screen.findByText('4821')).toBeOnTheScreen();
		expect(Notifications.clearLastNotificationResponseAsync).toHaveBeenCalled();
		expect(
			await screen.findByLabelText('Abrir Cantina da Nonna', { includeHiddenElements: true })
		).toBeOnTheScreen();
	});

	it('should open the delivery when a driver taps a notification', async () => {
		server.use(
			http.get(apiUrl('/restaurant-users/me'), () => HttpResponse.json(buildDriver())),
			http.get(apiUrl('/me/deliveries'), () => HttpResponse.json([buildDelivery()]))
		);
		await seedSession('driver');
		await renderApp();
		await screen.findByText('Minhas entregas');

		const listener = jest
			.mocked(Notifications.addNotificationResponseReceivedListener)
			.mock.calls.at(-1)?.[0];

		await act(() => listener?.(buildNotificationResponse({ orderId: 'order-1' })));

		expect(await screen.findByText('Entrega #42')).toBeOnTheScreen();
	});

	it('should ignore a notification without an order', async () => {
		await seedSession();
		await renderApp();
		await waitForHome();

		const listener = jest
			.mocked(Notifications.addNotificationResponseReceivedListener)
			.mock.calls.at(-1)?.[0];

		await act(() => listener?.(buildNotificationResponse({})));

		expect(screen.getByRole('button', { name: 'Abrir Cantina da Nonna' })).toBeOnTheScreen();
	});
});
