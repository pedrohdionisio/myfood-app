import { screen } from '@testing-library/react-native';

export async function waitForHome() {
	await screen.findByRole('button', { name: 'Abrir Cantina da Nonna' });
}
