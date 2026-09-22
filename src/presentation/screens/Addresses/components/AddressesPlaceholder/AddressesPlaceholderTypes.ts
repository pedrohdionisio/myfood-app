import type { AddressesListState } from '../../AddressesTypes';

export interface IAddressesPlaceholderProps {
	listState: AddressesListState;
	errorMessage: string;
	onRetry: () => void;
	onAddAddress: () => void;
}
