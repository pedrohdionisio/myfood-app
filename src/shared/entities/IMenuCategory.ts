import type { IMenuProduct } from './IMenuProduct';

export interface IMenuCategory {
	id: string;
	name: string;
	products: IMenuProduct[];
}
