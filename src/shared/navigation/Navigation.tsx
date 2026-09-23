import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { useState } from 'react';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { DriverStack } from './DriverStack';
import { useOpenNotificationTarget } from './useOpenNotificationTarget';

const navigationRef = createNavigationContainerRef<ReactNavigation.RootParamList>();

function SignedInStack() {
	const { profile } = useAuth();

	return profile === 'driver' ? <DriverStack /> : <AppStack />;
}

export function Navigation() {
	const { signedIn, profile } = useAuth();
	const [isNavigationReady, setIsNavigationReady] = useState(false);

	useOpenNotificationTarget({ navigationRef, profile, isNavigationReady });

	return (
		<NavigationContainer onReady={() => setIsNavigationReady(true)} ref={navigationRef}>
			{signedIn ? <SignedInStack /> : <AuthStack />}
		</NavigationContainer>
	);
}
