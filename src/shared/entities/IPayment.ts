import type { PaymentChargeStatus } from 'shared/constants/orders';

export interface IPayment {
	id: string;
	orderId: string;
	status: PaymentChargeStatus;
	amountCents: number;
	brCode: string;
	receiptUrl: string | null;
	expiresAt: string;
	paidAt: string | null;
	refundedAt: string | null;
	createdAt: string;
}
