import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HouseIcon, SearchIcon, UserIcon } from 'lucide-react-native';
import { Account } from 'presentation/screens/Account/Account';
import { Home } from 'presentation/screens/Home/Home';
import { Search } from 'presentation/screens/Search/Search';
import { COLORS } from 'shared/constants/colors';
import type { AppTabRoutesParamList } from './AppRoutesTypes';

const Tab = createBottomTabNavigator<AppTabRoutesParamList>();

export function AppTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: COLORS.brand.DEFAULT,
				tabBarInactiveTintColor: COLORS.gray[400],
				tabBarStyle: { borderTopColor: COLORS.gray[200] },
				tabBarLabelStyle: { fontFamily: 'Inter_500Medium', fontSize: 12 }
			}}
		>
			<Tab.Screen
				component={Home}
				name='Home'
				options={{
					title: 'Início',
					tabBarIcon: ({ color, size }) => <HouseIcon color={color} size={size} strokeWidth={1.8} />
				}}
			/>

			<Tab.Screen
				component={Search}
				name='Search'
				options={{
					title: 'Busca',
					tabBarIcon: ({ color, size }) => (
						<SearchIcon color={color} size={size} strokeWidth={1.8} />
					)
				}}
			/>

			<Tab.Screen
				component={Account}
				name='Account'
				options={{
					title: 'Conta',
					tabBarIcon: ({ color, size }) => <UserIcon color={color} size={size} strokeWidth={1.8} />
				}}
			/>
		</Tab.Navigator>
	);
}
