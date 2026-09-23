import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { PushNotificationsManager } from 'data/libs/PushNotificationsManager';
import { useEffect } from 'react';
import type { AuthProfile } from 'shared/constants/authProfiles';

export interface IUseOpenNotificationTargetParams {
	navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
	profile: AuthProfile | null;
	isNavigationReady: boolean;
}

export function useOpenNotificationTarget({
	navigationRef,
	profile,
	isNavigationReady
}: IUseOpenNotificationTargetParams) {
	useEffect(() => {
		if (!profile || !isNavigationReady) {
			return;
		}

		function openOrder(orderId: string) {
			if (profile === 'driver') {
				navigationRef.navigate('Delivery', { orderId });

				return;
			}

			navigationRef.navigate('Order', { orderId });
		}

		PushNotificationsManager.consumeLaunchNotification().then((notification) => {
			if (notification) {
				openOrder(notification.orderId);
			}
		});

		return PushNotificationsManager.subscribeToOpenedNotifications(({ orderId }) =>
			openOrder(orderId)
		);
	}, [navigationRef, profile, isNavigationReady]);
}
