import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { buildCustomer, buildDriver, buildSession } from 'tests/fixtures/users';
import { renderApp } from 'tests/render';
import { waitForHome } from 'tests/screens';
import { server } from 'tests/server';

describe('SignIn', () => {
	it('should sign in as a customer and open the home', async () => {
		server.use(
			http.post(apiUrl('/auth/customers/sign-in'), () =>
				HttpResponse.json({ customer: buildCustomer(), session: buildSession() })
			)
		);

		const { user } = await renderApp();

		await user.type(await screen.findByLabelText('E-mail'), 'ana@myfood.test');
		await user.type(screen.getByLabelText('Senha'), 'senha-forte-123');
		await user.press(screen.getByRole('button', { name: 'Entrar' }));

		await waitForHome();
	});

	it('should sign in as a driver and open the deliveries', async () => {
		server.use(
			http.post(apiUrl('/auth/restaurant-users/sign-in'), () =>
				HttpResponse.json({ user: buildDriver(), session: buildSession() })
			),
			http.get(apiUrl('/me/deliveries'), () => HttpResponse.json([]))
		);

		const { user } = await renderApp();

		await user.press(await screen.findByRole('radio', { name: 'Sou entregador' }));

		expect(screen.queryByRole('link', { name: 'Cadastre-se' })).not.toBeOnTheScreen();

		await user.type(screen.getByLabelText('E-mail'), 'bruno@myfood.test');
		await user.type(screen.getByLabelText('Senha'), 'senha-forte-123');
		await user.press(screen.getByRole('button', { name: 'Entrar' }));

		expect(await screen.findByText('Minhas entregas')).toBeOnTheScreen();
		expect(await screen.findByText('Nenhuma entrega em rota')).toBeOnTheScreen();
	});

	it('should show the API message when the credentials are refused', async () => {
		server.use(
			http.post(apiUrl('/auth/customers/sign-in'), () =>
				HttpResponse.json(
					{ code: 'UNAUTHORIZED', message: 'E-mail ou senha incorretos.' },
					{ status: 401 }
				)
			)
		);

		const { user } = await renderApp();

		await user.type(await screen.findByLabelText('E-mail'), 'ana@myfood.test');
		await user.type(screen.getByLabelText('Senha'), 'errada');
		await user.press(screen.getByRole('button', { name: 'Entrar' }));

		expect(await screen.findByText('E-mail ou senha incorretos.')).toBeOnTheScreen();
		expect(screen.getByRole('button', { name: 'Entrar' })).toBeOnTheScreen();
	});

	it('should validate the fields before calling the API', async () => {
		const { user } = await renderApp();

		await user.type(await screen.findByLabelText('E-mail'), 'ana');
		await user.press(screen.getByRole('button', { name: 'Entrar' }));

		expect(await screen.findByText('Formato de e-mail inválido')).toBeOnTheScreen();
		expect(screen.getByText('Informe sua senha')).toBeOnTheScreen();
	});

	it('should reveal the password on request', async () => {
		const { user } = await renderApp();

		expect(await screen.findByLabelText('Senha')).toHaveProp('secureTextEntry', true);

		await user.press(screen.getByRole('button', { name: 'Mostrar senha' }));

		expect(screen.getByLabelText('Senha')).toHaveProp('secureTextEntry', false);
		expect(screen.getByRole('button', { name: 'Esconder senha' })).toBeOnTheScreen();
	});
});
