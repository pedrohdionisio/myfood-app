import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_PADDING = 24;

export function useScreenPadding() {
	const { top, bottom } = useSafeAreaInsets();
	const tabBarHeight = useContext(BottomTabBarHeightContext);

	return {
		paddingTop: top + SCREEN_PADDING,
		paddingBottom: (tabBarHeight ?? bottom) + SCREEN_PADDING
	};
}
