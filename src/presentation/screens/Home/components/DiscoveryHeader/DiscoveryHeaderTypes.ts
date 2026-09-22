import type { ICuisineCategory } from 'shared/entities/ICuisineCategory';

export interface IDiscoveryHeaderProps {
	query: string;
	cuisineCategories: ICuisineCategory[];
	selectedCuisineSlug: string | null;
	hasActiveFilters: boolean;
	onChangeQuery: (value: string) => void;
	onSelectCuisine: (cuisineSlug: string) => void;
	onOpenFilters: () => void;
}
