const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
	throw new Error(
		'EXPO_PUBLIC_API_URL não configurada. Copie o .env.example para .env e preencha a URL da myfood-api.'
	);
}

const requestDelayMs = __DEV__ ? Number(process.env.EXPO_PUBLIC_REQUEST_DELAY_MS ?? 0) : 0;

export const env = {
	apiUrl,
	requestDelayMs: Number.isFinite(requestDelayMs) ? requestDelayMs : 0
};
