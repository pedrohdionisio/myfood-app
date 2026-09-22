import { AppText } from 'presentation/components/AppText/AppText';
import { RestaurantCard } from 'presentation/components/RestaurantCard/RestaurantCard';
import { FlatList, View } from 'react-native';
import { ProductHitCard } from './components/ProductHitCard/ProductHitCard';
import { SearchField } from './components/SearchField/SearchField';
import { SearchPlaceholder } from './components/SearchPlaceholder/SearchPlaceholder';
import { useSearchController } from './useSearchController';

export function Search() {
	const {
		query,
		contentPadding,
		foundRestaurants,
		foundProducts,
		listState,
		errorMessage,
		handleChangeQuery
	} = useSearchController();

	return (
		<View className='flex-1 bg-gray-50'>
			<FlatList
				ListEmptyComponent={
					foundProducts.length > 0 ? null : (
						<SearchPlaceholder errorMessage={errorMessage} listState={listState} />
					)
				}
				ListFooterComponent={
					foundProducts.length > 0 ? (
						<View className='mt-6 gap-3'>
							<AppText color='strong' size='titleSm' weight='semibold'>
								Pratos
							</AppText>

							{foundProducts.map((product) => (
								<ProductHitCard key={product.id} product={product} />
							))}
						</View>
					) : null
				}
				ListHeaderComponent={
					<View className='mb-4 gap-4'>
						<SearchField onChangeText={handleChangeQuery} value={query} />

						{foundRestaurants.length > 0 && (
							<AppText color='strong' size='titleSm' weight='semibold'>
								Restaurantes
							</AppText>
						)}
					</View>
				}
				contentContainerClassName='gap-3 px-6'
				contentContainerStyle={contentPadding}
				data={foundRestaurants}
				keyExtractor={(restaurant) => restaurant.id}
				keyboardShouldPersistTaps='handled'
				renderItem={({ item }) => <RestaurantCard restaurant={item} />}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
