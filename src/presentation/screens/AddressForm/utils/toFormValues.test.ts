import { buildCustomerAddress } from 'tests/fixtures/addresses';
import { toFormValues } from './toFormValues';

describe('toFormValues', () => {
	it('should start an empty form when there is no address', () => {
		expect(toFormValues(null)).toEqual({
			label: '',
			zipCode: '',
			street: '',
			number: '',
			complement: '',
			neighborhood: '',
			city: '',
			state: '',
			reference: ''
		});
	});

	it('should fill the form with the address, turning null fields into empty text', () => {
		expect(toFormValues(buildCustomerAddress({ label: null, complement: null }))).toEqual({
			label: '',
			zipCode: '01310100',
			street: 'Avenida Paulista',
			number: '1000',
			complement: '',
			neighborhood: 'Bela Vista',
			city: 'São Paulo',
			state: 'SP',
			reference: ''
		});
	});
});
