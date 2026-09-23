import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { DriverStack } from './DriverStack';

function SignedInStack() {
	const { profile } = useAuth();

	return profile === 'driver' ? <DriverStack /> : <AppStack />;
}

export function Navigation() {
	const { signedIn } = useAuth();

	return <NavigationContainer>{signedIn ? <SignedInStack /> : <AuthStack />}</NavigationContainer>;
}
