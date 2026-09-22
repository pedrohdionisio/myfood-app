import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { cn } from 'shared/utils/cn';
import type { IScreenLayoutProps } from './ScreenLayoutTypes';

const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

export function ScreenLayout({ children, className }: IScreenLayoutProps) {
	const contentPadding = useScreenPadding();

	return (
		<KeyboardAvoidingView behavior={keyboardBehavior} className='flex-1 bg-gray-50'>
			<ScrollView
				contentContainerClassName={cn('grow px-6', className)}
				contentContainerStyle={contentPadding}
				keyboardShouldPersistTaps='handled'
				showsVerticalScrollIndicator={false}
			>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
