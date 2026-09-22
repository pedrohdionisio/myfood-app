export interface IOrderItem {
	id: string;
	productId: string;
	productName: string;
	unitPriceCents: number;
	quantity: number;
	totalCents: number;
	notes: string | null;
}
