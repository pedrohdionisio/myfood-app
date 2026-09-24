import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
	it('should format cents as brazilian reais', () => {
		expect(formatPrice(123456)).toBe('R$ 1.234,56');
	});
});
