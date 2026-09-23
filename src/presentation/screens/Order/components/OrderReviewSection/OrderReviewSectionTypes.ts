import type { IReview } from 'shared/entities/IReview';

export interface IOrderReviewSectionProps {
	review: IReview | null;
	isLoading: boolean;
	errorMessage: string;
	onReview: () => void;
}
