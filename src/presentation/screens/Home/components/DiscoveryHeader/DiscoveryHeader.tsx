import { View } from 'react-native';
import { CuisinePills } from '../CuisinePills/CuisinePills';
import { DeliveryAddressButton } from '../DeliveryAddressButton/DeliveryAddressButton';
import { FilterButton } from '../FilterButton/FilterButton';
import { SearchField } from '../SearchField/SearchField';
import type { IDiscoveryHeaderProps } from './DiscoveryHeaderTypes';

export function DiscoveryHeader({
	deliveryAddress,
	query,
	cuisineCategories,
	selectedCuisineSlug,
	hasActiveFilters,
	onChangeQuery,
	onSelectCuisine,
	onOpenFilters,
	onOpenAddresses
}: IDiscoveryHeaderProps) {
	return (
		<View className='mb-4 gap-4'>
			{!!deliveryAddress && (
				<DeliveryAddressButton address={deliveryAddress} onPress={onOpenAddresses} />
			)}

			<View className='flex-row items-center gap-3'>
				<SearchField onChangeText={onChangeQuery} value={query} />

				<FilterButton hasActiveFilters={hasActiveFilters} onPress={onOpenFilters} />
			</View>

			{cuisineCategories.length > 0 && (
				<CuisinePills
					cuisineCategories={cuisineCategories}
					onSelectCuisine={onSelectCuisine}
					selectedCuisineSlug={selectedCuisineSlug}
				/>
			)}
		</View>
	);
}
