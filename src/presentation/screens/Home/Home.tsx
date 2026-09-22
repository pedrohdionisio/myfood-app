import { RestaurantCard } from 'presentation/components/RestaurantCard/RestaurantCard';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { DiscoveryFiltersSheet } from './components/DiscoveryFiltersSheet/DiscoveryFiltersSheet';
import { DiscoveryHeader } from './components/DiscoveryHeader/DiscoveryHeader';
import { RestaurantsPlaceholder } from './components/RestaurantsPlaceholder/RestaurantsPlaceholder';
import { useHomeController } from './useHomeController';

export function Home() {
	const {
		restaurants,
		cuisineCategories,
		contentPadding,
		filtersSheetRef,
		query,
		selectedCuisineSlug,
		includeClosed,
		hasActiveFilters,
		listState,
		errorMessage,
		isFetchingMoreRestaurants,
		handleChangeQuery,
		handleSelectCuisine,
		handleToggleIncludeClosed,
		handleOpenFilters,
		handleRetry,
		handleGoToAddressForm,
		handleEndReached
	} = useHomeController();

	return (
		<View className='flex-1 bg-background'>
			<FlatList
				ListEmptyComponent={
					<RestaurantsPlaceholder
						errorMessage={errorMessage}
						listState={listState}
						onAddAddress={handleGoToAddressForm}
						onRetry={handleRetry}
					/>
				}
				ListFooterComponent={
					isFetchingMoreRestaurants ? (
						<ActivityIndicator className='py-4' color={COLORS.brand.DEFAULT} />
					) : null
				}
				ListHeaderComponent={
					<DiscoveryHeader
						cuisineCategories={cuisineCategories}
						hasActiveFilters={hasActiveFilters}
						onChangeQuery={handleChangeQuery}
						onOpenFilters={handleOpenFilters}
						onSelectCuisine={(cuisineSlug) => handleSelectCuisine({ cuisineSlug })}
						query={query}
						selectedCuisineSlug={selectedCuisineSlug}
					/>
				}
				contentContainerClassName='gap-3 px-6'
				contentContainerStyle={contentPadding}
				data={restaurants}
				keyExtractor={(restaurant) => restaurant.id}
				keyboardShouldPersistTaps='handled'
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.4}
				renderItem={({ item }) => <RestaurantCard restaurant={item} />}
				showsVerticalScrollIndicator={false}
			/>

			<DiscoveryFiltersSheet
				includeClosed={includeClosed}
				onToggleIncludeClosed={(value) => handleToggleIncludeClosed({ includeClosed: value })}
				sheetRef={filtersSheetRef}
			/>
		</View>
	);
}
