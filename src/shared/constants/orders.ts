export const ORDER_STATUSES = [
	'PENDING_PAYMENT',
	'PENDING',
	'CONFIRMED',
	'PREPARING',
	'READY',
	'OUT_FOR_DELIVERY',
	'DELIVERED',
	'DELIVERY_FAILED',
	'REJECTED',
	'CANCELED'
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
	PENDING_PAYMENT: 'Aguardando pagamento',
	PENDING: 'Aguardando confirmação',
	CONFIRMED: 'Confirmado',
	PREPARING: 'Em preparo',
	READY: 'Pronto',
	OUT_FOR_DELIVERY: 'Saiu para entrega',
	DELIVERED: 'Entregue',
	DELIVERY_FAILED: 'Entrega não concluída',
	REJECTED: 'Recusado',
	CANCELED: 'Cancelado'
};

export const FINISHED_ORDER_STATUSES = [
	'DELIVERED',
	'DELIVERY_FAILED',
	'REJECTED',
	'CANCELED'
] as const;

export const PAYMENT_METHODS = ['ONLINE', 'CASH', 'CARD_ON_DELIVERY'] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
	ONLINE: 'Pix pelo app',
	CASH: 'Dinheiro na entrega',
	CARD_ON_DELIVERY: 'Cartão na entrega'
};

export const PAYMENT_STATUSES = ['PENDING', 'PAID', 'FAILED', 'REFUNDED'] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_CHARGE_STATUSES = [
	'PENDING',
	'PAID',
	'EXPIRED',
	'CANCELED',
	'REFUND_PENDING',
	'REFUNDED',
	'FAILED'
] as const;

export type PaymentChargeStatus = (typeof PAYMENT_CHARGE_STATUSES)[number];
