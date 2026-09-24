import { maskPhone } from './maskPhone';

describe('maskPhone', () => {
	it.each([
		['', ''],
		['1', '(1'],
		['11', '(11'],
		['119', '(11) 9'],
		['1133334444', '(11) 3333-4444'],
		['11987654321', '(11) 98765-4321'],
		['(11) 98765-43219999', '(11) 98765-4321']
	])('should mask %p as %p', (value, expected) => {
		expect(maskPhone(value)).toBe(expected);
	});
});
