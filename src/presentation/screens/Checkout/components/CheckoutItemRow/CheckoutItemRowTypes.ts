import type { ICartItem } from 'data/contexts/CartProvider/CartProviderTypes';

export interface ICheckoutItemRowProps {
	item: ICartItem;
	onRemove: () => void;
}
