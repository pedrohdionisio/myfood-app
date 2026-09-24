import type { NotificationResponse } from 'expo-notifications';

export function buildNotificationResponse(data: Record<string, unknown>): NotificationResponse {
	return {
		actionIdentifier: 'expo.modules.notifications.actions.DEFAULT',
		notification: {
			date: 0,
			request: {
				identifier: 'notification-1',
				trigger: null,
				content: {
					title: null,
					subtitle: null,
					body: null,
					data,
					categoryIdentifier: null,
					sound: null
				}
			}
		}
	};
}
