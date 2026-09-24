import { HttpResponse, http } from 'msw';
import { apiUrl } from 'tests/apiUrl';
import { server } from 'tests/server';
import { api, setAccessToken, setSessionHandlers } from './api';

function acceptOnly(validToken: string) {
	return http.get(apiUrl('/resource'), ({ request }) =>
		request.headers.get('Authorization') === `Bearer ${validToken}`
			? HttpResponse.json({ ok: true })
			: new HttpResponse(null, { status: 401 })
	);
}

function buildSessionHandlers(newToken = 'new-token') {
	const signOut = jest.fn(async () => undefined);
	const refreshAccessToken = jest.fn(async () => {
		setAccessToken(newToken);
	});

	setSessionHandlers({ refreshAccessToken, signOut });

	return { refreshAccessToken, signOut };
}

describe('api session interceptor', () => {
	beforeEach(() => {
		setAccessToken('expired-token');
	});

	it('should renew the session and replay the request with the new token', async () => {
		server.use(acceptOnly('new-token'));
		const { refreshAccessToken, signOut } = buildSessionHandlers();

		const { data } = await api.get('/resource');

		expect(data).toEqual({ ok: true });
		expect(refreshAccessToken).toHaveBeenCalledTimes(1);
		expect(signOut).not.toHaveBeenCalled();
	});

	it('should share one renewal between concurrent requests', async () => {
		server.use(acceptOnly('new-token'));
		const { refreshAccessToken } = buildSessionHandlers();

		const responses = await Promise.all([
			api.get('/resource'),
			api.get('/resource'),
			api.get('/resource')
		]);

		expect(responses.map((response) => response.data)).toEqual([
			{ ok: true },
			{ ok: true },
			{ ok: true }
		]);
		expect(refreshAccessToken).toHaveBeenCalledTimes(1);
	});

	it('should sign out when the request is still refused after renewing', async () => {
		server.use(acceptOnly('never-valid'));
		const { signOut } = buildSessionHandlers();

		await expect(api.get('/resource')).rejects.toMatchObject({ response: { status: 401 } });
		expect(signOut).toHaveBeenCalledTimes(1);
	});

	it('should pass the error on when renewing fails, without signing out', async () => {
		server.use(acceptOnly('new-token'));
		const signOut = jest.fn(async () => undefined);
		const refreshError = new Error('offline');
		setSessionHandlers({ refreshAccessToken: jest.fn().mockRejectedValue(refreshError), signOut });

		await expect(api.get('/resource')).rejects.toBe(refreshError);
		expect(signOut).not.toHaveBeenCalled();
	});

	it('should leave errors other than 401 alone', async () => {
		server.use(http.get(apiUrl('/resource'), () => new HttpResponse(null, { status: 500 })));
		const { refreshAccessToken } = buildSessionHandlers();

		await expect(api.get('/resource')).rejects.toMatchObject({ response: { status: 500 } });
		expect(refreshAccessToken).not.toHaveBeenCalled();
	});
});
