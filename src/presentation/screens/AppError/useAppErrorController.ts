import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export function useAppErrorController() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);
}
