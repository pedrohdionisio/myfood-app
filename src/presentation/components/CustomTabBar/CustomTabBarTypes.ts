import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export type TabRoute = BottomTabBarProps['state']['routes'][number];

export interface ICustomTabBarProps extends BottomTabBarProps {
	className?: string;
}

export interface IUseCustomTabBarControllerParams {
	state: BottomTabBarProps['state'];
	navigation: BottomTabBarProps['navigation'];
}

export interface IHandleTabPressParams {
	route: TabRoute;
	isFocused: boolean;
}

export interface IHandleTabLongPressParams {
	route: TabRoute;
}
