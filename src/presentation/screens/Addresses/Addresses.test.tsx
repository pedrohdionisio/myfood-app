import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';
import { spyOnAlert } from 'tests/alert';
import { apiUrl } from 'tests/apiUrl';
import { buildCustomerAddress } from 'tests/fixtures/addresses';
import { buildRestaurantSummary } from 'tests/fixtures/restaurants';
import { renderApp, seedSession } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

const home = buildCustomerAddress();
const work = buildCustomerAddress({
	id: 'address-2',
	label: 'Trabalho',
	street: 'Rua Augusta',
	number: '500',
	complement: null,
	isDefault: false
});

function serveAddresses() {
	let addresses: ICustomerAddress[] = [home, work];
	const restaurantRequests: (string | null)[] = [];

	server.use(
		http.get(apiUrl('/customers/me/addresses'), () => HttpResponse.json(addresses)),
		http.patch(apiUrl('/customers/me/addresses/:addressId/default'), ({ params }) => {
			addresses = addresses
				.map((address) => ({ ...address, isDefault: address.id === params.addressId }))
				.sort((first, second) => Number(second.isDefault) - Number(first.isDefault));

			return HttpResponse.json(addresses[0]);
		}),
		http.delete(apiUrl('/customers/me/addresses/:addressId'), ({ params }) => {
			addresses = addresses.filter((address) => address.id !== params.addressId);

			return HttpResponse.json(addresses);
		}),
		http.get(apiUrl('/discovery/restaurants'), ({ request }) => {
			restaurantRequests.push(new URL(request.url).searchParams.get('addressId'));

			return HttpResponse.json({
				items: [buildRestaurantSummary()],
				page: 1,
				perPage: 20,
				hasMore: false
			});
		})
	);

	return restaurantRequests;
}

describe('Addresses', () => {
	beforeEach(async () => {
		await seedSession();
	});

	it('should switch the delivery address from the home and reload the restaurants', async () => {
		const restaurantRequests = serveAddresses();
		const { user } = await renderApp();
		await waitForHome();

		await user.press(
			screen.getByRole('button', { name: 'Rua Augusta, 500 Bela Vista · São Paulo/SP' })
		);

		expect(
			await screen.findByRole('button', { name: 'Entregar em Rua Augusta, 500' })
		).toBeOnTheScreen();
		await waitForHome();
		expect(restaurantRequests).toEqual(['address-1', 'address-2']);
	});

	it('should make an address the default and delete another', async () => {
		serveAddresses();
		const { pressAlertButton } = spyOnAlert();
		const { user } = await renderApp();
		await waitForHome();

		await user.press(screen.getByRole('button', { name: 'Gerenciar endereços' }));
		await user.press(
			await screen.findByRole('button', { name: 'Tornar Trabalho o endereço padrão' })
		);

		expect(
			await screen.findByRole('button', { name: 'Tornar Casa o endereço padrão' })
		).toBeOnTheScreen();

		await user.press(screen.getByRole('button', { name: 'Excluir Casa' }));
		await pressAlertButton('Excluir');

		expect(screen.queryByRole('button', { name: 'Excluir Casa' })).not.toBeOnTheScreen();
		expect(screen.getByRole('button', { name: 'Excluir Trabalho' })).toBeOnTheScreen();
	});
});
