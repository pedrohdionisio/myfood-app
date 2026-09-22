import { api } from 'data/config/api';
import type { ICuisineCategory } from 'shared/entities/ICuisineCategory';

async function list(): Promise<ICuisineCategory[]> {
	const { data } = await api.get<ICuisineCategory[]>('/cuisine-categories');

	return data;
}

export const CuisineService = {
	list
};
