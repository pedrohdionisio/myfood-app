import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	useFonts
} from '@expo-google-fonts/inter';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'data/config/queryClient';
import { AuthProvider } from 'data/contexts/AuthProvider/AuthProvider';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from 'shared/navigation/Navigation';
import './src/styles/global.css';

export default function App() {
	const [isFontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold
	});

	if (!isFontsLoaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<GestureHandlerRootView className='flex-1'>
					<BottomSheetModalProvider>
						<StatusBar style='dark' />

						<AuthProvider>
							<Navigation />
						</AuthProvider>
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
