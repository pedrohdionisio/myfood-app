import type { ICuisineCategory } from 'shared/entities/ICuisineCategory';
import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';

export interface IDiscoveryHeaderProps {
	deliveryAddress: ICustomerAddress | null;
	query: string;
	cuisineCategories: ICuisineCategory[];
	selectedCuisineSlug: string | null;
	hasActiveFilters: boolean;
	onChangeQuery: (value: string) => void;
	onSelectCuisine: (cuisineSlug: string) => void;
	onOpenFilters: () => void;
	onOpenAddresses: () => void;
}
