import { z } from 'zod';

const envSchema = z.object({
	EXPO_PUBLIC_API_URL: z.url(),
	EXPO_PUBLIC_REQUEST_DELAY_MS: z.coerce.number().int().min(0).default(0)
});

const result = envSchema.safeParse({
	EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
	EXPO_PUBLIC_REQUEST_DELAY_MS: process.env.EXPO_PUBLIC_REQUEST_DELAY_MS
});

if (!result.success) {
	const invalidVariables = result.error.issues.map((issue) => issue.path.join('.')).join(', ');

	throw new Error(
		`Variáveis de ambiente inválidas: ${invalidVariables}. Copie o .env.example para .env e preencha a URL da myfood-api.`
	);
}

export const env = {
	apiUrl: result.data.EXPO_PUBLIC_API_URL,
	requestDelayMs: __DEV__ ? result.data.EXPO_PUBLIC_REQUEST_DELAY_MS : 0
};
