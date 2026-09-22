import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function Navigation() {
	const { signedIn } = useAuth();

	return <NavigationContainer>{signedIn ? <AppStack /> : <AuthStack />}</NavigationContainer>;
}
