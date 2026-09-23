import { useQueryClient } from '@tanstack/react-query';
import {
	removeAccessToken,
	removeSessionHandlers,
	setAccessToken,
	setSessionHandlers
} from 'data/config/api';
import { AuthTokensManager, type IAuthTokens } from 'data/libs/AuthTokensManager';
import { PushNotificationsManager } from 'data/libs/PushNotificationsManager';
import { AuthService } from 'data/modules/auth/services/AuthService';
import type { IAuthSessionResponse } from 'data/modules/auth/types/AuthTypes';
import { DriverAuthService } from 'data/modules/driverAuth/services/DriverAuthService';
import type { IDriverSessionResponse } from 'data/modules/driverAuth/types/DriverAuthTypes';
import { PushTokenService } from 'data/modules/pushToken/services/PushTokenService';
import type { IUnregisterPushTokenPayload } from 'data/modules/pushToken/types/PushTokenTypes';
import {
	createContext,
	type PropsWithChildren,
	use,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react';
import type { AuthProfile } from 'shared/constants/authProfiles';
import type { IAuthContextValue, SignedInUser } from './AuthProviderTypes';

const AuthContext = createContext<IAuthContextValue | null>(null);

const REFRESH_TOKEN_BY_PROFILE = {
	customer: AuthService.refreshToken,
	driver: DriverAuthService.refreshToken
};

async function fetchSignedInUser(profile: AuthProfile): Promise<SignedInUser> {
	if (profile === 'driver') {
		return { profile, driver: await DriverAuthService.getMe() };
	}

	return { profile, customer: await AuthService.getMe() };
}

export function AuthProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<SignedInUser | null>(null);
	const [isRestoringSession, setIsRestoringSession] = useState(true);
	const pushRegistrationRef = useRef<IUnregisterPushTokenPayload | null>(null);
	const queryClient = useQueryClient();
	const profile = user?.profile ?? null;

	const signOut = useCallback(async () => {
		const pushRegistration = pushRegistrationRef.current;

		pushRegistrationRef.current = null;
		removeSessionHandlers();

		if (pushRegistration) {
			await PushTokenService.unregister(pushRegistration).catch(() => undefined);
		}

		removeAccessToken();
		queryClient.clear();
		setUser(null);

		await AuthTokensManager.clear();
	}, [queryClient]);

	const refreshAccessToken = useCallback(async () => {
		const stored = await AuthTokensManager.load();

		if (!stored) {
			await signOut();

			throw new Error('Não há refresh token para renovar a sessão');
		}

		try {
			const { accessToken } = await REFRESH_TOKEN_BY_PROFILE[stored.profile]({
				refreshToken: stored.refreshToken
			});

			setAccessToken(accessToken);

			await AuthTokensManager.save({ ...stored, accessToken });
		} catch (error) {
			await signOut();

			throw error;
		}
	}, [signOut]);

	const activateSession = useCallback(
		async (tokens: IAuthTokens) => {
			await AuthTokensManager.save(tokens);

			setAccessToken(tokens.accessToken);
			setSessionHandlers({ refreshAccessToken, signOut });
		},
		[refreshAccessToken, signOut]
	);

	const startCustomerSession = useCallback(
		async ({ customer, session }: IAuthSessionResponse) => {
			await activateSession({
				profile: 'customer',
				accessToken: session.accessToken,
				refreshToken: session.refreshToken
			});

			setUser({ profile: 'customer', customer });
		},
		[activateSession]
	);

	const startDriverSession = useCallback(
		async ({ user: driver, session }: IDriverSessionResponse) => {
			await activateSession({
				profile: 'driver',
				accessToken: session.accessToken,
				refreshToken: session.refreshToken
			});

			setUser({ profile: 'driver', driver });
		},
		[activateSession]
	);

	useEffect(() => {
		async function restoreSession() {
			const tokens = await AuthTokensManager.load();

			if (tokens) {
				await activateSession(tokens);

				const restoredUser = await fetchSignedInUser(tokens.profile).catch(() => null);

				setUser(restoredUser);
			}

			setIsRestoringSession(false);
		}

		restoreSession();
	}, [activateSession]);

	useEffect(() => {
		if (!profile) {
			return;
		}

		let isActive = true;

		async function registerPushToken(currentProfile: AuthProfile) {
			const devicePushToken = await PushNotificationsManager.getDevicePushToken();

			if (!devicePushToken || !isActive) {
				return;
			}

			try {
				await PushTokenService.register({ profile: currentProfile, ...devicePushToken });

				if (isActive) {
					pushRegistrationRef.current = {
						profile: currentProfile,
						token: devicePushToken.token
					};
				}
			} catch {
				pushRegistrationRef.current = null;
			}
		}

		registerPushToken(profile);

		return () => {
			isActive = false;
		};
	}, [profile]);

	if (isRestoringSession) {
		return null;
	}

	return (
		<AuthContext.Provider
			value={{
				profile,
				customer: user?.profile === 'customer' ? user.customer : null,
				driver: user?.profile === 'driver' ? user.driver : null,
				signedIn: !!user,
				startCustomerSession,
				startDriverSession,
				signOut
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = use(AuthContext);

	if (!context) {
		throw new Error('useAuth precisa estar dentro do AuthProvider');
	}

	return context;
}
