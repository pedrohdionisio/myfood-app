export interface IPublicReview {
	id: string;
	rating: number;
	comment: string | null;
	reply: string | null;
	repliedAt: string | null;
	createdAt: string;
	customerFirstName: string;
}
