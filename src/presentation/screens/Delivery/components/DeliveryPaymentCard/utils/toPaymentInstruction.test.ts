import { buildDelivery } from 'tests/fixtures/deliveries';
import { toPaymentInstruction } from './toPaymentInstruction';

describe('toPaymentInstruction', () => {
	it('should tell there is nothing to charge when it was paid online', () => {
		expect(toPaymentInstruction(buildDelivery({ paymentMethod: 'ONLINE' }))).toBe(
			'Já foi pago pelo app. Nada a cobrar.'
		);
	});

	it('should ask for the card machine when paying by card on delivery', () => {
		expect(toPaymentInstruction(buildDelivery({ paymentMethod: 'CARD_ON_DELIVERY' }))).toBe(
			'Cobre na maquininha ao entregar.'
		);
	});

	it('should ask for cash without an amount when the total is unknown', () => {
		expect(toPaymentInstruction(buildDelivery({ totalCents: null }))).toBe(
			'Cobre em dinheiro ao entregar.'
		);
	});

	it('should ask for the exact amount when no change is needed', () => {
		expect(toPaymentInstruction(buildDelivery({ changeForCents: 5490 }))).toBe(
			'Cobre R$ 54,90 em dinheiro.'
		);
	});

	it('should tell how much change to bring', () => {
		expect(toPaymentInstruction(buildDelivery({ changeForCents: 10000 }))).toBe(
			'Cobre R$ 54,90 em dinheiro. O cliente vai pagar com R$ 100,00: leve R$ 45,10 de troco.'
		);
	});
});
