import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_PADDING = 24;

export function useScreenPadding() {
	const { top, bottom } = useSafeAreaInsets();

	return {
		paddingTop: top + SCREEN_PADDING,
		paddingBottom: bottom + SCREEN_PADDING
	};
}
