import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Deliveries } from 'presentation/screens/Deliveries/Deliveries';
import { Delivery } from 'presentation/screens/Delivery/Delivery';
import type { DriverRoutesParamList } from './AppRoutesTypes';

const Stack = createNativeStackNavigator<DriverRoutesParamList>();

export function DriverStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen component={Deliveries} name='Deliveries' />
			<Stack.Screen component={Delivery} name='Delivery' />
		</Stack.Navigator>
	);
}
