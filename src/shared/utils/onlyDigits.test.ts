import { onlyDigits } from './onlyDigits';

describe('onlyDigits', () => {
	it('should keep only the digits of the value', () => {
		expect(onlyDigits('(11) 98765-4321')).toBe('11987654321');
		expect(onlyDigits('sem dígitos')).toBe('');
	});
});
