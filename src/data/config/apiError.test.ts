import { AxiosError, AxiosHeaders } from 'axios';
import {
	getApiErrorCode,
	getApiErrorMessage,
	getApiErrorReason,
	isRejectedByApi
} from './apiError';

function buildResponseError(status: number, data: unknown) {
	const config = { headers: new AxiosHeaders() };

	return new AxiosError('Request failed', 'ERR_BAD_RESPONSE', config, null, {
		status,
		statusText: '',
		headers: {},
		config,
		data
	});
}

const networkError = new AxiosError('Network Error', 'ERR_NETWORK');

describe('apiError', () => {
	it('should show the message sent by the API', () => {
		expect(
			getApiErrorMessage(buildResponseError(409, { code: 'CONFLICT', message: 'E-mail já usado' }))
		).toBe('E-mail já usado');
	});

	it('should fall back to a connection message when there is no response', () => {
		expect(getApiErrorMessage(networkError)).toBe(
			'Não foi possível falar com o servidor. Verifique sua conexão.'
		);
	});

	it('should fall back to a generic message for errors that are not from axios', () => {
		expect(getApiErrorMessage(new Error('boom'))).toBe(
			'Não foi possível concluir a ação. Tente novamente.'
		);
	});

	it('should read only the codes the API is known to emit', () => {
		expect(getApiErrorCode(buildResponseError(404, { code: 'NOT_FOUND' }))).toBe('NOT_FOUND');
		expect(getApiErrorCode(buildResponseError(400, { code: 'SOMETHING_NEW' }))).toBeNull();
		expect(getApiErrorCode(networkError)).toBeNull();
	});

	it('should read the reason from the error details', () => {
		expect(
			getApiErrorReason(buildResponseError(422, { details: { reason: 'RESTAURANT_CLOSED' } }))
		).toBe('RESTAURANT_CLOSED');
		expect(getApiErrorReason(buildResponseError(422, { details: { reason: 3 } }))).toBeNull();
		expect(getApiErrorReason(buildResponseError(422, {}))).toBeNull();
	});

	it('should treat only 4xx responses as rejected by the API', () => {
		expect(isRejectedByApi(buildResponseError(401, {}))).toBe(true);
		expect(isRejectedByApi(buildResponseError(503, {}))).toBe(false);
		expect(isRejectedByApi(networkError)).toBe(false);
	});
});
