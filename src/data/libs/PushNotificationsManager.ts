import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { DevicePlatform } from 'shared/constants/devicePlatforms';

export interface IDevicePushToken {
	token: string;
	platform: DevicePlatform;
}

export interface IOpenedNotification {
	orderId: string;
}

const ANDROID_CHANNEL_ID = 'orders';

function resolvePlatform(): DevicePlatform | null {
	if (Platform.OS === 'ios') {
		return 'IOS';
	}

	if (Platform.OS === 'android') {
		return 'ANDROID';
	}

	return null;
}

function resolveProjectId(): string | null {
	const projectId: unknown =
		Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

	return typeof projectId === 'string' && projectId !== '' ? projectId : null;
}

function toOpenedNotification(response: Notifications.NotificationResponse) {
	const { orderId } = response.notification.request.content.data ?? {};

	return typeof orderId === 'string' ? { orderId } : null;
}

async function hasPermission() {
	const current = await Notifications.getPermissionsAsync();

	if (current.granted) {
		return true;
	}

	if (!current.canAskAgain) {
		return false;
	}

	const requested = await Notifications.requestPermissionsAsync();

	return requested.granted;
}

function configure() {
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowBanner: true,
			shouldShowList: true,
			shouldPlaySound: true,
			shouldSetBadge: false
		})
	});
}

async function getDevicePushToken(): Promise<IDevicePushToken | null> {
	const platform = resolvePlatform();
	const projectId = resolveProjectId();

	if (!Device.isDevice || !platform || !projectId) {
		return null;
	}

	try {
		if (platform === 'ANDROID') {
			await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
				name: 'Pedidos',
				importance: Notifications.AndroidImportance.HIGH
			});
		}

		if (!(await hasPermission())) {
			return null;
		}

		const { data } = await Notifications.getExpoPushTokenAsync({ projectId });

		return { token: data, platform };
	} catch {
		return null;
	}
}

async function consumeLaunchNotification(): Promise<IOpenedNotification | null> {
	const response = await Notifications.getLastNotificationResponseAsync();

	if (!response) {
		return null;
	}

	await Notifications.clearLastNotificationResponseAsync();

	return toOpenedNotification(response);
}

function subscribeToOpenedNotifications(listener: (notification: IOpenedNotification) => void) {
	const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
		const notification = toOpenedNotification(response);

		if (notification) {
			listener(notification);
		}
	});

	return () => subscription.remove();
}

export const PushNotificationsManager = {
	configure,
	getDevicePushToken,
	consumeLaunchNotification,
	subscribeToOpenedNotifications
};
