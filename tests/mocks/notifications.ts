export const notificationsMock = {
	AndroidImportance: { HIGH: 4 },
	setNotificationHandler: jest.fn(),
	setNotificationChannelAsync: jest.fn(async () => null),
	getPermissionsAsync: jest.fn(async () => ({ granted: false, canAskAgain: false })),
	requestPermissionsAsync: jest.fn(async () => ({ granted: false, canAskAgain: false })),
	getExpoPushTokenAsync: jest.fn(async () => ({ data: 'ExponentPushToken[test]' })),
	getLastNotificationResponseAsync: jest.fn(async () => null),
	clearLastNotificationResponseAsync: jest.fn(async () => undefined),
	addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() }))
};
