import type { IDelivery } from 'shared/entities/IDelivery';
import { formatPrice } from 'shared/utils/formatPrice';

export function toPaymentInstruction({ paymentMethod, totalCents, changeForCents }: IDelivery) {
	if (paymentMethod === 'ONLINE') {
		return 'Já foi pago pelo app. Nada a cobrar.';
	}

	if (paymentMethod === 'CARD_ON_DELIVERY') {
		return 'Cobre na maquininha ao entregar.';
	}

	if (totalCents === null) {
		return 'Cobre em dinheiro ao entregar.';
	}

	if (changeForCents === null || changeForCents <= totalCents) {
		return `Cobre ${formatPrice(totalCents)} em dinheiro.`;
	}

	return `Cobre ${formatPrice(totalCents)} em dinheiro. O cliente vai pagar com ${formatPrice(changeForCents)}: leve ${formatPrice(changeForCents - totalCents)} de troco.`;
}
