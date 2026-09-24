import { act, renderHook } from '@testing-library/react-native';
import { buildMenuProduct, buildPublicRestaurant } from 'tests/fixtures/restaurants';
import { CartProvider, useCart } from './CartProvider';

const restaurant = buildPublicRestaurant();
const lasagna = buildMenuProduct();
const gnocchi = buildMenuProduct({ id: 'product-2', name: 'Nhoque', priceCents: 3600 });

async function renderCart() {
	return renderHook(() => useCart(), { wrapper: CartProvider });
}

describe('CartProvider', () => {
	it('should add up the quantity of a product added twice and keep the last notes', async () => {
		const { result } = await renderCart();

		await act(() => {
			result.current.addCartItem({ restaurant, product: lasagna, quantity: 1, notes: null });
			result.current.addCartItem({
				restaurant,
				product: lasagna,
				quantity: 2,
				notes: 'Sem queijo'
			});
			result.current.addCartItem({ restaurant, product: gnocchi, quantity: 1, notes: null });
		});

		expect(result.current.cart?.items).toEqual([
			{ product: lasagna, quantity: 3, notes: 'Sem queijo' },
			{ product: gnocchi, quantity: 1, notes: null }
		]);
		expect(result.current.itemCount).toBe(4);
		expect(result.current.subtotalCents).toBe(3 * 4200 + 3600);
	});

	it('should drop the items of another restaurant when a product comes from a new one', async () => {
		const { result } = await renderCart();
		const otherRestaurant = buildPublicRestaurant({ id: 'restaurant-2', tradeName: 'Sushi Kai' });

		await act(() => {
			result.current.addCartItem({ restaurant, product: lasagna, quantity: 2, notes: null });
			result.current.addCartItem({
				restaurant: otherRestaurant,
				product: gnocchi,
				quantity: 1,
				notes: null
			});
		});

		expect(result.current.cart?.restaurant.tradeName).toBe('Sushi Kai');
		expect(result.current.cart?.items).toEqual([{ product: gnocchi, quantity: 1, notes: null }]);
	});

	it('should empty the cart when its last item is removed', async () => {
		const { result } = await renderCart();

		await act(() => {
			result.current.addCartItem({ restaurant, product: lasagna, quantity: 1, notes: null });
		});
		await act(() => {
			result.current.removeCartItem({ productId: lasagna.id });
		});

		expect(result.current.cart).toBeNull();
		expect(result.current.itemCount).toBe(0);
	});
});
