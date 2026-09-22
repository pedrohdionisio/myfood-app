import { Pressable, View, type ViewStyle } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import type { ICustomTabBarProps } from './CustomTabBarTypes';
import { useCustomTabBarController } from './useCustomTabBarController';

const BAR_HEIGHT = 64;
const ICON_SIZE = 24;

const BAR_SHADOW: ViewStyle = {
	shadowColor: COLORS.gray[900],
	shadowOffset: { width: 0, height: 8 },
	shadowOpacity: 0.12,
	shadowRadius: 16,
	elevation: 12
};

export function CustomTabBar({ state, descriptors, navigation, className }: ICustomTabBarProps) {
	const { routes, focusedIndex, bottomSpacing, handleLayout, handleTabPress, handleTabLongPress } =
		useCustomTabBarController({ state, navigation });

	return (
		<View
			className={cn('absolute right-0 bottom-0 left-0 px-5', className)}
			onLayout={handleLayout}
			pointerEvents='box-none'
			style={{ paddingBottom: bottomSpacing }}
		>
			<View
				className='w-full flex-row items-center rounded-full bg-white px-2'
				style={[BAR_SHADOW, { height: BAR_HEIGHT }]}
			>
				{routes.map((route, index) => {
					const isFocused = focusedIndex === index;
					const options = descriptors[route.key]?.options;

					return (
						<Pressable
							accessibilityLabel={options?.title ?? route.name}
							accessibilityRole='tab'
							accessibilityState={{ selected: isFocused }}
							className='h-full flex-1 items-center justify-center gap-1'
							key={route.key}
							onLongPress={() => handleTabLongPress({ route })}
							onPress={() => handleTabPress({ route, isFocused })}
						>
							{options?.tabBarIcon?.({
								focused: isFocused,
								color: isFocused ? COLORS.brand.DEFAULT : COLORS.gray[400],
								size: ICON_SIZE
							})}

							<View
								className={cn('h-1 w-1 rounded-full', isFocused ? 'bg-brand' : 'bg-transparent')}
							/>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
