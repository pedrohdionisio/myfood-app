import type { ICuisineCategory } from 'shared/entities/ICuisineCategory';

export function buildCuisineCategories(): ICuisineCategory[] {
	return [
		{ id: 'cuisine-1', slug: 'italiana', name: 'Italiana', iconKey: null },
		{ id: 'cuisine-2', slug: 'japonesa', name: 'Japonesa', iconKey: null }
	];
}
