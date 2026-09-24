import { buildDelivery } from 'tests/fixtures/deliveries';
import { formatDeliveryAddress } from './formatDeliveryAddress';

describe('formatDeliveryAddress', () => {
	it('should join street, number, complement, neighborhood, city and state', () => {
		expect(formatDeliveryAddress(buildDelivery())).toBe(
			'Avenida Paulista, 1000 - Apto 12 · Bela Vista, São Paulo - SP'
		);
	});

	it('should leave the complement out when there is none', () => {
		expect(formatDeliveryAddress(buildDelivery({ deliveryComplement: null }))).toBe(
			'Avenida Paulista, 1000 · Bela Vista, São Paulo - SP'
		);
	});
});
