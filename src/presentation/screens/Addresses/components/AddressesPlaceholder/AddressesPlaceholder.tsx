import { EmptyState } from 'presentation/components/EmptyState/EmptyState';
import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';
import type { IAddressesPlaceholderProps } from './AddressesPlaceholderTypes';

const SKELETON_ITEMS = ['first', 'second'];

export function AddressesPlaceholder({
	listState,
	errorMessage,
	onRetry,
	onAddAddress
}: IAddressesPlaceholderProps) {
	switch (listState) {
		case 'loading':
			return (
				<View className='gap-3'>
					{SKELETON_ITEMS.map((item) => (
						<Skeleton className='h-32 w-full' key={item} />
					))}
				</View>
			);

		case 'error':
			return <ErrorState actionTitle='Tentar de novo' message={errorMessage} onAction={onRetry} />;

		default:
			return (
				<EmptyState
					actionTitle='Cadastrar endereço'
					description='Cadastre onde você quer receber seus pedidos.'
					onAction={onAddAddress}
					title='Nenhum endereço ainda'
				/>
			);
	}
}
