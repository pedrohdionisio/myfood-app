import { ReviewCard } from 'presentation/components/ReviewCard/ReviewCard';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { RestaurantReviewsPlaceholder } from './components/RestaurantReviewsPlaceholder/RestaurantReviewsPlaceholder';
import { useRestaurantReviewsController } from './useRestaurantReviewsController';

export function RestaurantReviews() {
	const {
		tradeName,
		reviews,
		contentPadding,
		listState,
		errorMessage,
		isFetchingMoreReviews,
		handleGoBack,
		handleRetry,
		handleEndReached
	} = useRestaurantReviewsController();

	return (
		<View className='flex-1 bg-background'>
			<FlatList
				ListEmptyComponent={
					<RestaurantReviewsPlaceholder
						errorMessage={errorMessage}
						listState={listState}
						onRetry={handleRetry}
					/>
				}
				ListFooterComponent={
					isFetchingMoreReviews ? (
						<ActivityIndicator className='py-4' color={COLORS.brand.DEFAULT} />
					) : null
				}
				ListHeaderComponent={
					<View className='mb-4'>
						<ScreenHeader onBack={handleGoBack} title={`Avaliações de ${tradeName}`} />
					</View>
				}
				contentContainerClassName='gap-3 px-6'
				contentContainerStyle={contentPadding}
				data={reviews}
				keyExtractor={(review) => review.id}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.4}
				renderItem={({ item }) => (
					<ReviewCard
						comment={item.comment}
						createdAt={item.createdAt}
						rating={item.rating}
						reply={item.reply}
						title={item.customerFirstName}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
