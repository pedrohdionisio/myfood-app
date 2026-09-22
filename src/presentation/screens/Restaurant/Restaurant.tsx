import { ChevronLeftIcon } from 'lucide-react-native';
import { EmptyState } from 'presentation/components/EmptyState/EmptyState';
import { FlatList, Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { CartBar } from './components/CartBar/CartBar';
import { MenuCategorySection } from './components/MenuCategorySection/MenuCategorySection';
import { ProductSheet } from './components/ProductSheet/ProductSheet';
import { RestaurantHeader } from './components/RestaurantHeader/RestaurantHeader';
import { RestaurantPlaceholder } from './components/RestaurantPlaceholder/RestaurantPlaceholder';
import { useRestaurantController } from './useRestaurantController';

export function Restaurant() {
	const {
		restaurant,
		menuCategories,
		productSheetRef,
		selectedProduct,
		cartItemCount,
		cartSubtotalCents,
		shouldShowCartBar,
		bottomInset,
		topInset,
		contentPadding,
		screenState,
		shouldShowMenu,
		errorMessage,
		handleSelectProduct,
		handleAddProduct,
		handleGoToCheckout,
		handleRetry,
		handleGoBack
	} = useRestaurantController();

	return (
		<View className='flex-1 bg-background'>
			<Pressable
				accessibilityLabel='Voltar'
				accessibilityRole='button'
				className='absolute left-6 z-10 h-10 w-10 items-center justify-center rounded-full bg-white active:opacity-80'
				hitSlop={8}
				onPress={handleGoBack}
				style={{ top: topInset + 12 }}
			>
				<ChevronLeftIcon color={COLORS.gray[700]} size={22} strokeWidth={2} />
			</Pressable>

			{shouldShowMenu && restaurant ? (
				<FlatList
					ListEmptyComponent={
						<EmptyState
							description='Este restaurante ainda não publicou itens no cardápio.'
							title='Cardápio vazio'
						/>
					}
					ListHeaderComponent={<RestaurantHeader restaurant={restaurant} topInset={topInset} />}
					contentContainerClassName='gap-6'
					contentContainerStyle={contentPadding}
					data={menuCategories}
					keyExtractor={(category) => category.id}
					renderItem={({ item }) => (
						<MenuCategorySection category={item} onSelectProduct={handleSelectProduct} />
					)}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<RestaurantPlaceholder
					errorMessage={errorMessage}
					onRetry={handleRetry}
					screenState={screenState}
				/>
			)}

			{shouldShowCartBar && (
				<CartBar
					bottomInset={bottomInset}
					itemCount={cartItemCount}
					onPress={handleGoToCheckout}
					subtotalCents={cartSubtotalCents}
				/>
			)}

			<ProductSheet onAdd={handleAddProduct} product={selectedProduct} sheetRef={productSheetRef} />
		</View>
	);
}
