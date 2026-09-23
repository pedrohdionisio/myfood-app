import { EmptyState } from 'presentation/components/EmptyState/EmptyState';
import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';
import type { IRestaurantReviewsPlaceholderProps } from './RestaurantReviewsPlaceholderTypes';

const SKELETON_ITEMS = ['first', 'second', 'third'];

export function RestaurantReviewsPlaceholder({
	listState,
	errorMessage,
	onRetry
}: IRestaurantReviewsPlaceholderProps) {
	switch (listState) {
		case 'loading':
			return (
				<View className='gap-3'>
					{SKELETON_ITEMS.map((item) => (
						<Skeleton className='h-28 w-full' key={item} />
					))}
				</View>
			);

		case 'error':
			return <ErrorState actionTitle='Tentar de novo' message={errorMessage} onAction={onRetry} />;

		default:
			return (
				<EmptyState
					description='Quando alguém avaliar um pedido deste restaurante, a nota aparece aqui.'
					title='Nenhuma avaliação ainda'
				/>
			);
	}
}
