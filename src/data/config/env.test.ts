function loadEnv() {
	let env: unknown;

	jest.isolateModules(() => {
		env = jest.requireActual('./env').env;
	});

	return env;
}

describe('env', () => {
	const originalEnv = process.env;

	afterEach(() => {
		process.env = originalEnv;
	});

	it('should read the API url and the request delay', () => {
		process.env = {
			...originalEnv,
			EXPO_PUBLIC_API_URL: 'http://localhost:3333',
			EXPO_PUBLIC_REQUEST_DELAY_MS: '500'
		};

		expect(loadEnv()).toEqual({ apiUrl: 'http://localhost:3333', requestDelayMs: 500 });
	});

	it('should default the request delay to zero', () => {
		process.env = { ...originalEnv, EXPO_PUBLIC_REQUEST_DELAY_MS: undefined };

		expect(loadEnv()).toEqual({ apiUrl: 'http://api.test', requestDelayMs: 0 });
	});

	it('should name every invalid variable', () => {
		process.env = {
			...originalEnv,
			EXPO_PUBLIC_API_URL: 'not-a-url',
			EXPO_PUBLIC_REQUEST_DELAY_MS: 'soon'
		};

		expect(loadEnv).toThrow(
			'Variáveis de ambiente inválidas: EXPO_PUBLIC_API_URL, EXPO_PUBLIC_REQUEST_DELAY_MS.'
		);
	});
});
