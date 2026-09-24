import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildCustomerAddress } from 'tests/fixtures/addresses';
import { renderApp, seedSession } from 'tests/render';
import { server } from 'tests/server';

const VIACEP_URL = 'https://viacep.com.br/ws/01310100/json/';

function serveCustomerWithoutAddress() {
	const addresses: ReturnType<typeof buildCustomerAddress>[] = [];
	const createdBodies: unknown[] = [];

	server.use(
		http.get(apiUrl('/customers/me/addresses'), () => HttpResponse.json(addresses)),
		http.get(apiUrl('/discovery/restaurants'), ({ request }) =>
			new URL(request.url).searchParams.has('addressId')
				? HttpResponse.json({ items: [], page: 1, perPage: 20, hasMore: false })
				: HttpResponse.json(
						{
							code: 'DOMAIN_ERROR',
							message: 'Cadastre um endereço para ver quem entrega até você.',
							details: { reason: 'NO_ADDRESS' }
						},
						{ status: 422 }
					)
		),
		http.post(apiUrl('/customers/me/addresses'), async ({ request }) => {
			createdBodies.push(await request.json());
			addresses.push(buildCustomerAddress({ label: null, complement: null }));

			return HttpResponse.json(addresses[0], { status: 201 });
		})
	);

	return createdBodies;
}

async function openNewAddressForm() {
	await seedSession();
	const rendered = await renderApp();

	await rendered.user.press(await screen.findByRole('button', { name: 'Cadastrar endereço' }));
	await screen.findByText('Novo endereço');

	return rendered;
}

describe('AddressForm', () => {
	it('should fill the address from the zip code and save it', async () => {
		const createdBodies = serveCustomerWithoutAddress();
		server.use(
			http.get(VIACEP_URL, () =>
				HttpResponse.json({
					cep: '01310-100',
					logradouro: 'Avenida Paulista',
					complemento: '',
					bairro: 'Bela Vista',
					localidade: 'São Paulo',
					uf: 'SP'
				})
			)
		);
		const { user } = await openNewAddressForm();

		await user.type(screen.getByLabelText('CEP'), '01310100');

		expect(await screen.findByDisplayValue('Avenida Paulista')).toBeOnTheScreen();
		expect(screen.getByLabelText('Bairro')).toHaveDisplayValue('Bela Vista');
		expect(screen.getByLabelText('UF')).toHaveDisplayValue('SP');

		await user.type(screen.getByLabelText('Número'), '1000');
		await user.press(screen.getByRole('button', { name: 'Salvar endereço' }));

		expect(await screen.findByText('Tudo fechado por aqui')).toBeOnTheScreen();
		expect(createdBodies).toEqual([
			{
				zipCode: '01310100',
				street: 'Avenida Paulista',
				number: '1000',
				neighborhood: 'Bela Vista',
				city: 'São Paulo',
				state: 'SP'
			}
		]);
	});

	it('should flag a zip code that does not exist', async () => {
		serveCustomerWithoutAddress();
		server.use(http.get(VIACEP_URL, () => HttpResponse.json({ erro: 'true' })));
		const { user } = await openNewAddressForm();

		await user.type(screen.getByLabelText('CEP'), '01310100');

		expect(await screen.findByText('CEP não encontrado')).toBeOnTheScreen();
	});

	it('should let the customer type the address when the zip lookup fails', async () => {
		serveCustomerWithoutAddress();
		server.use(http.get(VIACEP_URL, () => HttpResponse.error()));
		const { user } = await openNewAddressForm();

		await user.type(screen.getByLabelText('CEP'), '01310100');

		expect(
			await screen.findByText('Não foi possível consultar o CEP. Preencha na mão.')
		).toBeOnTheScreen();
	});

	it('should point out the missing fields', async () => {
		serveCustomerWithoutAddress();
		const { user } = await openNewAddressForm();

		await user.press(screen.getByRole('button', { name: 'Salvar endereço' }));

		expect(await screen.findByText('Informe o CEP com 8 dígitos')).toBeOnTheScreen();
		expect(screen.getByText('Informe a rua')).toBeOnTheScreen();
		expect(screen.getByText('Informe o número')).toBeOnTheScreen();
	});
});
