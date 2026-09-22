import { EmptyState } from 'presentation/components/EmptyState/EmptyState';
import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';
import type { IRestaurantsPlaceholderProps } from './RestaurantsPlaceholderTypes';

const SKELETON_ITEMS = ['first', 'second', 'third', 'fourth', 'fifth'];

export function RestaurantsPlaceholder({
	listState,
	errorMessage,
	onRetry,
	onAddAddress
}: IRestaurantsPlaceholderProps) {
	switch (listState) {
		case 'loading':
			return (
				<View className='gap-3'>
					{SKELETON_ITEMS.map((item) => (
						<Skeleton className='h-24 w-full' key={item} />
					))}
				</View>
			);

		case 'missingAddress':
			return (
				<EmptyState
					actionTitle='Cadastrar endereço'
					description={errorMessage}
					onAction={onAddAddress}
					title='Onde você quer receber?'
				/>
			);

		case 'error':
			return <ErrorState actionTitle='Tentar de novo' message={errorMessage} onAction={onRetry} />;

		case 'noResults':
			return (
				<EmptyState
					description='Tente outro termo, outra categoria, ou mostre também os fechados.'
					title='Nada encontrado'
				/>
			);

		default:
			return (
				<EmptyState
					description='Nenhum restaurante aberto entregando na sua região agora.'
					title='Tudo fechado por aqui'
				/>
			);
	}
}
