import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useCart } from 'data/contexts/CartProvider/CartProvider';
import { useGetRestaurant } from 'data/modules/discovery/useCases/getRestaurant/useGetRestaurant';
import { useGetRestaurantMenu } from 'data/modules/discovery/useCases/getRestaurantMenu/useGetRestaurantMenu';
import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IMenuProduct } from 'shared/entities/IMenuProduct';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import type { IAddProductParams } from './components/ProductSheet/ProductSheetTypes';
import type { RestaurantScreenState } from './RestaurantTypes';

export function useRestaurantController() {
	const navigation = useNavigation();
	const { params } = useRoute<RouteProp<AppRoutesParamList, 'Restaurant'>>();
	const { top, bottom } = useSafeAreaInsets();
	const { paddingBottom } = useScreenPadding();
	const productSheetRef = useRef<BottomSheetModal>(null);
	const [selectedProduct, setSelectedProduct] = useState<IMenuProduct | null>(null);
	const { cart, itemCount, subtotalCents, addCartItem } = useCart();

	const { restaurant, isLoadingRestaurant, restaurantError, refetchRestaurant } = useGetRestaurant(
		params.slug
	);

	const { menuCategories, isLoadingMenu, menuError, refetchMenu } = useGetRestaurantMenu(
		params.restaurantId
	);

	const error = restaurantError ?? menuError;

	function resolveScreenState(): RestaurantScreenState {
		if (isLoadingRestaurant || isLoadingMenu) {
			return 'loading';
		}

		if (error || !restaurant) {
			return 'error';
		}

		return menuCategories.length > 0 ? 'ready' : 'emptyMenu';
	}

	function handleSelectProduct(product: IMenuProduct) {
		setSelectedProduct(product);
		productSheetRef.current?.present();
	}

	function addSelectedProduct({ quantity, notes }: IAddProductParams) {
		if (!restaurant || !selectedProduct) {
			return;
		}

		addCartItem({ restaurant, product: selectedProduct, quantity, notes });
		productSheetRef.current?.dismiss();
	}

	function handleAddProduct(params: IAddProductParams) {
		const otherRestaurantName =
			cart && restaurant && cart.restaurant.id !== restaurant.id ? cart.restaurant.tradeName : null;

		if (!otherRestaurantName) {
			addSelectedProduct(params);

			return;
		}

		Alert.alert(
			'Começar outro pedido?',
			`Seu carrinho tem itens de ${otherRestaurantName}. Adicionar daqui esvazia o carrinho.`,
			[
				{ text: 'Cancelar', style: 'cancel' },
				{
					text: 'Esvaziar e adicionar',
					style: 'destructive',
					onPress: () => addSelectedProduct(params)
				}
			]
		);
	}

	function handleGoToCheckout() {
		navigation.navigate('Checkout');
	}

	function handleRetry() {
		refetchRestaurant();
		refetchMenu();
	}

	function handleGoBack() {
		navigation.goBack();
	}

	const screenState = resolveScreenState();

	const isCartFromThisRestaurant = cart !== null && cart.restaurant.id === params.restaurantId;

	return {
		restaurant,
		menuCategories,
		productSheetRef,
		selectedProduct,
		cartItemCount: isCartFromThisRestaurant ? itemCount : 0,
		cartSubtotalCents: isCartFromThisRestaurant ? subtotalCents : 0,
		shouldShowCartBar: isCartFromThisRestaurant && itemCount > 0,
		bottomInset: bottom,
		topInset: top,
		contentPadding: { paddingBottom },
		screenState,
		shouldShowMenu: screenState === 'ready' || screenState === 'emptyMenu',
		errorMessage: error ? getApiErrorMessage(error) : '',
		handleSelectProduct,
		handleAddProduct,
		handleGoToCheckout,
		handleRetry,
		handleGoBack
	};
}
