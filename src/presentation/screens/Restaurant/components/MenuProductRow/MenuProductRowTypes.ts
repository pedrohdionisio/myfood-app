import type { IMenuProduct } from 'shared/entities/IMenuProduct';

export interface IMenuProductRowProps {
	product: IMenuProduct;
	onPress: () => void;
}
