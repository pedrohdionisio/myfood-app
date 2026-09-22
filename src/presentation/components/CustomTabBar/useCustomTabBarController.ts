import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type {
	IHandleTabLongPressParams,
	IHandleTabPressParams,
	IUseCustomTabBarControllerParams
} from './CustomTabBarTypes';

const MIN_BOTTOM_SPACING = 16;

export function useCustomTabBarController({ state, navigation }: IUseCustomTabBarControllerParams) {
	const { bottom } = useSafeAreaInsets();
	const reportTabBarHeight = useContext(BottomTabBarHeightCallbackContext);

	function handleLayout({ nativeEvent }: LayoutChangeEvent) {
		reportTabBarHeight?.(nativeEvent.layout.height);
	}

	function handleTabPress({ route, isFocused }: IHandleTabPressParams) {
		const event = navigation.emit({
			type: 'tabPress',
			target: route.key,
			canPreventDefault: true
		});

		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(route.name, route.params);
		}
	}

	function handleTabLongPress({ route }: IHandleTabLongPressParams) {
		navigation.emit({ type: 'tabLongPress', target: route.key });
	}

	return {
		routes: state.routes,
		focusedIndex: state.index,
		bottomSpacing: bottom > 0 ? bottom : MIN_BOTTOM_SPACING,
		handleLayout,
		handleTabPress,
		handleTabLongPress
	};
}
