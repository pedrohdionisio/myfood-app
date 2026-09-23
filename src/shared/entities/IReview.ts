export interface IReview {
	id: string;
	orderId: string;
	restaurantId: string;
	rating: number;
	comment: string | null;
	reply: string | null;
	repliedAt: string | null;
	createdAt: string;
}
