import { EmptyState } from 'presentation/components/EmptyState/EmptyState';
import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';
import type { ISearchPlaceholderProps } from './SearchPlaceholderTypes';

const SKELETON_ITEMS = ['first', 'second', 'third'];

export function SearchPlaceholder({ listState, errorMessage }: ISearchPlaceholderProps) {
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
			return <ErrorState message={errorMessage} />;

		case 'empty':
			return (
				<EmptyState description='Tente outro termo ou confira a grafia.' title='Nada encontrado' />
			);

		default:
			return (
				<EmptyState
					description='Digite ao menos duas letras para buscar restaurantes e pratos.'
					title='O que você quer comer?'
				/>
			);
	}
}
