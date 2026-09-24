import { screen, type userEvent } from '@testing-library/react-native';
import { waitForHome } from './screens';

type User = ReturnType<typeof userEvent.setup>;

interface IAddProductToCartParams {
	productName: string;
	quantity?: number;
	notes?: string;
}

export async function openRestaurant(user: User, tradeName = 'Cantina da Nonna') {
	await waitForHome();
	await user.press(screen.getByRole('button', { name: `Abrir ${tradeName}` }));
}

export async function addProductToCart(
	user: User,
	{ productName, quantity = 1, notes }: IAddProductToCartParams
) {
	await user.press(await screen.findByRole('button', { name: `Adicionar ${productName}` }));

	for (let added = 1; added < quantity; added++) {
		await user.press(screen.getByRole('button', { name: 'Aumentar quantidade' }));
	}

	if (notes) {
		await user.type(screen.getByLabelText('Observação'), notes);
	}

	await user.press(screen.getByRole('button', { name: /^Adicionar R\$/ }));
}

export async function goToCheckout(user: User) {
	await user.press(await screen.findByRole('button', { name: 'Ver carrinho' }));
	await screen.findByText('Resumo do pedido');
}

export async function openOrder(user: User, displayNumber = 42) {
	await waitForHome();
	await user.press(screen.getByRole('tab', { name: 'Pedidos' }));
	await user.press(await screen.findByRole('button', { name: `Abrir pedido ${displayNumber}` }));
}
