import type { IMenuCategory } from 'shared/entities/IMenuCategory';
import type { IMenuProduct } from 'shared/entities/IMenuProduct';

export interface IMenuCategorySectionProps {
	category: IMenuCategory;
	onSelectProduct: (product: IMenuProduct) => void;
}
