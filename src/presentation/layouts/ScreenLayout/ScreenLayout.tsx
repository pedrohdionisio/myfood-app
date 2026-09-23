import { RefreshControl, ScrollView } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { cn } from 'shared/utils/cn';
import type { IScreenLayoutProps } from './ScreenLayoutTypes';

export function ScreenLayout({
	children,
	className,
	isRefreshing = false,
	onRefresh
}: IScreenLayoutProps) {
	const contentPadding = useScreenPadding();

	return (
		<ScrollView
			automaticallyAdjustKeyboardInsets
			className='flex-1 bg-background'
			contentContainerClassName={cn('grow px-6', className)}
			contentContainerStyle={contentPadding}
			keyboardShouldPersistTaps='handled'
			refreshControl={
				onRefresh ? (
					<RefreshControl
						onRefresh={onRefresh}
						refreshing={isRefreshing}
						tintColor={COLORS.brand.DEFAULT}
					/>
				) : undefined
			}
			showsVerticalScrollIndicator={false}
		>
			{children}
		</ScrollView>
	);
}
