import { act } from '@testing-library/react-native';
import { Alert, type AlertButton } from 'react-native';

export function spyOnAlert() {
	const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => undefined);

	async function pressAlertButton(text: string) {
		const buttons: AlertButton[] = alertSpy.mock.calls.at(-1)?.[2] ?? [];
		const button = buttons.find((candidate) => candidate.text === text);

		if (!button) {
			throw new Error(`O alerta não tem o botão "${text}"`);
		}

		await act(async () => {
			await button.onPress?.();
		});
	}

	return { alertSpy, pressAlertButton };
}
