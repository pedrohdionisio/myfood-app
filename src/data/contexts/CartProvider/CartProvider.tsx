import { createContext, type PropsWithChildren, use, useCallback, useMemo, useState } from 'react';
import type {
	IAddCartItemParams,
	ICart,
	ICartContextValue,
	IRemoveCartItemParams
} from './CartProviderTypes';

const CartContext = createContext<ICartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
	const [cart, setCart] = useState<ICart | null>(null);

	const addCartItem = useCallback(
		({ restaurant, product, quantity, notes }: IAddCartItemParams) => {
			setCart((current) => {
				const isSameRestaurant = current?.restaurant.id === restaurant.id;

				const items = isSameRestaurant && current ? current.items : [];
				const existing = items.find((item) => item.product.id === product.id);

				const nextItems = existing
					? items.map((item) =>
							item.product.id === product.id
								? { ...item, quantity: item.quantity + quantity, notes }
								: item
						)
					: [...items, { product, quantity, notes }];

				return {
					restaurant: {
						id: restaurant.id,
						slug: restaurant.slug,
						tradeName: restaurant.tradeName,
						deliveryFeeCents: restaurant.deliveryFeeCents,
						minOrderCents: restaurant.minOrderCents
					},
					items: nextItems
				};
			});
		},
		[]
	);

	const removeCartItem = useCallback(({ productId }: IRemoveCartItemParams) => {
		setCart((current) => {
			if (!current) {
				return null;
			}

			const items = current.items.filter((item) => item.product.id !== productId);

			return items.length > 0 ? { ...current, items } : null;
		});
	}, []);

	const clearCart = useCallback(() => setCart(null), []);

	const { itemCount, subtotalCents } = useMemo(() => {
		const items = cart?.items ?? [];

		return {
			itemCount: items.reduce((total, item) => total + item.quantity, 0),
			subtotalCents: items.reduce(
				(total, item) => total + item.product.priceCents * item.quantity,
				0
			)
		};
	}, [cart]);

	return (
		<CartContext.Provider
			value={{ cart, itemCount, subtotalCents, addCartItem, removeCartItem, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = use(CartContext);

	if (!context) {
		throw new Error('useCart precisa estar dentro do CartProvider');
	}

	return context;
}
