import { screen } from '@testing-library/react-native';
import { HttpResponse, http } from 'msw';
import { spyOnAlert } from 'tests/alert';
import { apiUrl } from 'tests/apiUrl';
import { renderApp } from 'tests/render';
import { server } from 'tests/server';

describe('ResetPassword', () => {
	it('should recover the password of a driver in the driver pool', async () => {
		const calls: string[] = [];
		server.use(
			http.post(apiUrl('/auth/restaurant-users/forgot-password'), async ({ request }) => {
				calls.push(`forgot ${JSON.stringify(await request.json())}`);

				return HttpResponse.json({ message: 'Se o e-mail existir, enviamos um código.' });
			}),
			http.post(apiUrl('/auth/restaurant-users/reset-password'), async ({ request }) => {
				calls.push(`reset ${JSON.stringify(await request.json())}`);

				return HttpResponse.json({ message: 'Senha alterada. Entre com a nova senha.' });
			})
		);
		const { alertSpy } = spyOnAlert();
		const { user } = await renderApp();

		await user.press(await screen.findByRole('radio', { name: 'Sou entregador' }));
		await user.press(screen.getByRole('link', { name: 'Esqueci minha senha' }));
		await user.type(await screen.findByLabelText('E-mail'), 'bruno@myfood.test');
		await user.press(screen.getByRole('button', { name: 'Enviar código' }));

		await user.type(await screen.findByLabelText('Código'), '123456');
		await user.type(screen.getByLabelText('Nova senha'), 'SenhaNova1');
		await user.type(screen.getByLabelText('Confirme a nova senha'), 'SenhaNova1');
		await user.press(screen.getByRole('button', { name: 'Salvar nova senha' }));

		expect(await screen.findByRole('button', { name: 'Entrar' })).toBeOnTheScreen();
		expect(alertSpy).toHaveBeenCalledWith(
			'Senha alterada',
			'Senha alterada. Entre com a nova senha.'
		);
		expect(calls).toEqual([
			'forgot {"email":"bruno@myfood.test"}',
			'reset {"email":"bruno@myfood.test","code":"123456","password":"SenhaNova1"}'
		]);
	});

	it('should resend the code and show the API error on an invalid one', async () => {
		server.use(
			http.post(apiUrl('/auth/customers/forgot-password'), () =>
				HttpResponse.json({ message: 'Se o e-mail existir, enviamos um código.' })
			),
			http.post(apiUrl('/auth/customers/reset-password'), () =>
				HttpResponse.json(
					{ code: 'BAD_REQUEST', message: 'Código inválido ou expirado.' },
					{ status: 400 }
				)
			)
		);
		const { alertSpy } = spyOnAlert();
		const { user } = await renderApp();

		await user.press(await screen.findByRole('link', { name: 'Esqueci minha senha' }));
		await user.type(await screen.findByLabelText('E-mail'), 'ana@myfood.test');
		await user.press(screen.getByRole('button', { name: 'Enviar código' }));
		await user.press(await screen.findByRole('button', { name: 'Reenviar código' }));

		expect(alertSpy).toHaveBeenCalledWith(
			'Código reenviado',
			'Se o e-mail existir, enviamos um código.'
		);

		await user.type(screen.getByLabelText('Código'), '000000');
		await user.type(screen.getByLabelText('Nova senha'), 'SenhaNova1');
		await user.type(screen.getByLabelText('Confirme a nova senha'), 'SenhaNova1');
		await user.press(screen.getByRole('button', { name: 'Salvar nova senha' }));

		expect(await screen.findByText('Código inválido ou expirado.')).toBeOnTheScreen();
	});
});
