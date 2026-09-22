import { AppText } from 'presentation/components/AppText/AppText';
import { RestaurantCard } from 'presentation/components/RestaurantCard/RestaurantCard';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { RestaurantsPlaceholder } from './components/RestaurantsPlaceholder/RestaurantsPlaceholder';
import { useHomeController } from './useHomeController';

export function Home() {
	const {
		restaurants,
		contentPadding,
		listState,
		errorMessage,
		isFetchingMoreRestaurants,
		handleRetry,
		handleGoToAddressForm,
		handleEndReached
	} = useHomeController();

	return (
		<View className='flex-1 bg-gray-50'>
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
					<AppText className='mb-4' color='strong' size='titleMd' weight='semibold'>
						Restaurantes
					</AppText>
				}
				contentContainerClassName='gap-3 px-6'
				contentContainerStyle={contentPadding}
				data={restaurants}
				keyExtractor={(restaurant) => restaurant.id}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.4}
				renderItem={({ item }) => <RestaurantCard restaurant={item} />}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
