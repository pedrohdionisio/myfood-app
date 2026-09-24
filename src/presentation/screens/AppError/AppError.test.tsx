import { render, screen, userEvent } from '@testing-library/react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AppError } from 'presentation/screens/AppError/AppError';
import { ErrorBoundary } from 'react-error-boundary';
import { Text } from 'react-native';

jest.mock('expo-splash-screen', () => ({ hideAsync: jest.fn(async () => undefined) }));

let shouldThrow = true;

function BrokenScreen() {
	if (shouldThrow) {
		throw new Error('Cannot read properties of undefined');
	}

	return <Text>Tela recuperada</Text>;
}

describe('AppError', () => {
	it('should replace a crashed tree, release the splash and render it again on retry', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => undefined);
		const user = userEvent.setup();

		await render(
			<ErrorBoundary FallbackComponent={AppError}>
				<BrokenScreen />
			</ErrorBoundary>
		);

		expect(screen.getByText('Algo deu errado')).toBeOnTheScreen();
		expect(SplashScreen.hideAsync).toHaveBeenCalled();

		shouldThrow = false;
		await user.press(screen.getByRole('button', { name: 'Tentar de novo' }));

		expect(screen.getByText('Tela recuperada')).toBeOnTheScreen();
	});
});
