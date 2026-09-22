import axios, { type AxiosInstance } from 'axios';
import { sleep } from 'shared/utils/sleep';
import { env } from './env';

export const api = axios.create({
	baseURL: env.apiUrl
});

export const publicApi = axios.create({
	baseURL: env.apiUrl
});

export function setAccessToken(accessToken: string) {
	api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export function removeAccessToken() {
	api.defaults.headers.common.Authorization = undefined;
}

function delayRequests(instance: AxiosInstance) {
	instance.interceptors.request.use(async (config) => {
		await sleep(env.requestDelayMs);

		return config;
	});
}

if (__DEV__ && env.requestDelayMs > 0) {
	delayRequests(api);
	delayRequests(publicApi);
}
