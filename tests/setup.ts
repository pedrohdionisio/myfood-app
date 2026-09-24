import 'react-native-gesture-handler/jestSetup';
import { removeAccessToken, removeSessionHandlers } from 'data/config/api';
import { clearSecureStore } from './mocks/secureStore';
import { server } from './server';

jest.mock('expo-secure-store', () => jest.requireActual('./mocks/secureStore').secureStoreMock);
jest.mock(
	'expo-notifications',
	() => jest.requireActual('./mocks/notifications').notificationsMock
);
jest.mock('expo-crypto', () => ({
	randomUUID: () => jest.requireActual('node:crypto').randomUUID()
}));
jest.mock('react-native-reanimated', () => jest.requireActual('react-native-reanimated/mock'));
jest.mock(
	'react-native-safe-area-context',
	() => jest.requireActual('react-native-safe-area-context/jest/mock').default
);
jest.mock('@gorhom/bottom-sheet', () => jest.requireActual('@gorhom/bottom-sheet/mock'));

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
	jest.restoreAllMocks();
	server.resetHandlers();
	removeAccessToken();
	removeSessionHandlers();
	clearSecureStore();
});

afterAll(() => server.close());
