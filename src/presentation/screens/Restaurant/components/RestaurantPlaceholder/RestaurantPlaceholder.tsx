import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';
import type { IRestaurantPlaceholderProps } from './RestaurantPlaceholderTypes';

const SKELETON_ROWS = ['first', 'second', 'third', 'fourth'];

export function RestaurantPlaceholder({
	screenState,
	errorMessage,
	onRetry
}: IRestaurantPlaceholderProps) {
	if (screenState === 'error') {
		return (
			<View className='flex-1 justify-center'>
				<ErrorState actionTitle='Tentar de novo' message={errorMessage} onAction={onRetry} />
			</View>
		);
	}

	return (
		<View>
			<Skeleton className='h-52 w-full rounded-none' />

			<View className='items-center gap-3 px-6 pt-4'>
				<Skeleton className='h-6 w-48' />
				<Skeleton className='h-4 w-32' />
				<Skeleton className='mt-2 h-20 w-full' />
			</View>

			<View className='gap-4 px-6 pt-8'>
				{SKELETON_ROWS.map((row) => (
					<Skeleton className='h-20 w-full' key={row} />
				))}
			</View>
		</View>
	);
}
