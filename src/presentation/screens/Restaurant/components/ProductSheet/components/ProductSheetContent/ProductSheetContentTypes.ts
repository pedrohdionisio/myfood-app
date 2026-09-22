import type { IMenuProduct } from 'shared/entities/IMenuProduct';
import type { IAddProductParams } from '../../ProductSheetTypes';

export interface IProductSheetContentProps {
	product: IMenuProduct;
	onAdd: (params: IAddProductParams) => void;
}
