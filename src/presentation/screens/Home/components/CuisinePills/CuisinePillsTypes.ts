import type { ICuisineCategory } from 'shared/entities/ICuisineCategory';

export interface ICuisinePillsProps {
	cuisineCategories: ICuisineCategory[];
	selectedCuisineSlug: string | null;
	onSelectCuisine: (cuisineSlug: string) => void;
}
