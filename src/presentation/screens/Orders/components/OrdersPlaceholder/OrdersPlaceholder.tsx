import { EmptyState } from 'presentation/components/EmptyState/EmptyState';
import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';
import type { IOrdersPlaceholderProps } from './OrdersPlaceholderTypes';

const SKELETON_ITEMS = ['first', 'second', 'third'];

export function OrdersPlaceholder({ listState, errorMessage, onRetry }: IOrdersPlaceholderProps) {
	switch (listState) {
		case 'loading':
			return (
				<View className='gap-3'>
					{SKELETON_ITEMS.map((item) => (
						<Skeleton className='h-24 w-full' key={item} />
					))}
				</View>
			);

		case 'error':
			return <ErrorState actionTitle='Tentar de novo' message={errorMessage} onAction={onRetry} />;

		default:
			return (
				<EmptyState
					description='Quando você fizer um pedido, ele aparece aqui.'
					title='Nenhum pedido ainda'
				/>
			);
	}
}
