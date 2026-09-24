import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildCustomer, buildSession } from 'tests/fixtures/users';
import { renderApp } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

async function openSignUp() {
	const rendered = await renderApp();

	await rendered.user.press(await screen.findByRole('link', { name: 'Cadastre-se' }));
	await screen.findByRole('button', { name: 'Criar conta' });

	return rendered;
}

describe('SignUp', () => {
	it('should create the account with a masked phone and open the home', async () => {
		const bodies: unknown[] = [];
		server.use(
			http.post(apiUrl('/auth/customers/sign-up'), async ({ request }) => {
				bodies.push(await request.json());

				return HttpResponse.json(
					{ customer: buildCustomer(), session: buildSession() },
					{ status: 201 }
				);
			})
		);
		const { user } = await openSignUp();

		await user.type(screen.getByLabelText('Nome'), 'Ana Souza');
		await user.type(screen.getByLabelText('E-mail'), 'ana@myfood.test');
		await user.type(screen.getByLabelText('Telefone (opcional)'), '11987654321');

		expect(screen.getByLabelText('Telefone (opcional)')).toHaveDisplayValue('(11) 98765-4321');

		await user.type(screen.getByLabelText('Senha'), 'SenhaForte1');
		await user.press(screen.getByRole('button', { name: 'Criar conta' }));

		await waitForHome();
		expect(bodies).toEqual([
			{
				name: 'Ana Souza',
				email: 'ana@myfood.test',
				password: 'SenhaForte1',
				phone: '11987654321'
			}
		]);
	});

	it('should show the API message when the e-mail is taken', async () => {
		server.use(
			http.post(apiUrl('/auth/customers/sign-up'), () =>
				HttpResponse.json(
					{ code: 'CONFLICT', message: 'Já existe uma conta com este e-mail.' },
					{ status: 409 }
				)
			)
		);
		const { user } = await openSignUp();

		await user.type(screen.getByLabelText('Nome'), 'Ana Souza');
		await user.type(screen.getByLabelText('E-mail'), 'ana@myfood.test');
		await user.type(screen.getByLabelText('Senha'), 'SenhaForte1');
		await user.press(screen.getByRole('button', { name: 'Criar conta' }));

		expect(await screen.findByText('Já existe uma conta com este e-mail.')).toBeOnTheScreen();
	});
});
