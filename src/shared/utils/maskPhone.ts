import { onlyDigits } from './onlyDigits';

export function maskPhone(value: string) {
	const digits = onlyDigits(value).slice(0, 11);

	if (digits.length <= 2) {
		return digits.length > 0 ? `(${digits}` : '';
	}

	const areaCode = digits.slice(0, 2);
	const number = digits.slice(2);
	const splitAt = digits.length === 11 ? 5 : 4;

	if (number.length <= splitAt) {
		return `(${areaCode}) ${number}`;
	}

	return `(${areaCode}) ${number.slice(0, splitAt)}-${number.slice(splitAt)}`;
}
