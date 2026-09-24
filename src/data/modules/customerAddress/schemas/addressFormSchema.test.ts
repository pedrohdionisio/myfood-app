import { addressFormSchema } from './addressFormSchema';

const validForm = {
	label: '',
	zipCode: '01310-100',
	street: 'Avenida Paulista',
	number: '1000',
	complement: '',
	neighborhood: 'Bela Vista',
	city: 'São Paulo',
	state: 'sp',
	reference: ''
};

describe('addressFormSchema', () => {
	it('should send the zip code as digits, the state in uppercase and drop empty optionals', () => {
		expect(addressFormSchema.parse(validForm)).toEqual({
			label: undefined,
			zipCode: '01310100',
			street: 'Avenida Paulista',
			number: '1000',
			complement: undefined,
			neighborhood: 'Bela Vista',
			city: 'São Paulo',
			state: 'SP',
			reference: undefined
		});
	});

	it('should reject an incomplete zip code and an invalid state', () => {
		const result = addressFormSchema.safeParse({ ...validForm, zipCode: '0131', state: 'S' });

		expect(result.error?.issues.map((issue) => issue.message)).toEqual([
			'Informe o CEP com 8 dígitos',
			'Informe a UF com 2 letras'
		]);
	});
});
