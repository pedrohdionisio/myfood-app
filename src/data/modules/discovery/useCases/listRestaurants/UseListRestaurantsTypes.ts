export interface IUseListRestaurantsParams {
	term: string;
	cuisineSlug: string | null;
	includeClosed: boolean;
	addressId: string | null;
	isEnabled: boolean;
}
