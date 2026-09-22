import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from 'shared/utils/cn';
import type { IScreenLayoutProps } from './ScreenLayoutTypes';

const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

export function ScreenLayout({ children, className }: IScreenLayoutProps) {
	const { top, bottom } = useSafeAreaInsets();

	return (
		<KeyboardAvoidingView behavior={keyboardBehavior} className='flex-1 bg-gray-50'>
			<ScrollView
				contentContainerClassName={cn('grow px-6', className)}
				contentContainerStyle={{ paddingTop: top + 24, paddingBottom: bottom + 24 }}
				keyboardShouldPersistTaps='handled'
				showsVerticalScrollIndicator={false}
			>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
