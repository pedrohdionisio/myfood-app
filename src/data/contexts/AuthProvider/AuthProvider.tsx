import { useQueryClient } from '@tanstack/react-query';
import {
	removeAccessToken,
	removeSessionHandlers,
	setAccessToken,
	setSessionHandlers
} from 'data/config/api';
import { AuthTokensManager, type IAuthTokens } from 'data/libs/AuthTokensManager';
import { AuthService } from 'data/modules/auth/services/AuthService';
import type { IAuthSessionResponse } from 'data/modules/auth/types/AuthTypes';
import {
	createContext,
	type PropsWithChildren,
	use,
	useCallback,
	useEffect,
	useState
} from 'react';
import type { ICustomer } from 'shared/entities/ICustomer';
import type { IAuthContextValue } from './AuthProviderTypes';

const AuthContext = createContext<IAuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
	const [customer, setCustomer] = useState<ICustomer | null>(null);
	const [isRestoringSession, setIsRestoringSession] = useState(true);
	const queryClient = useQueryClient();

	const signOut = useCallback(async () => {
		removeAccessToken();
		removeSessionHandlers();
		queryClient.clear();
		setCustomer(null);

		await AuthTokensManager.clear();
	}, [queryClient]);

	const refreshAccessToken = useCallback(async () => {
		const stored = await AuthTokensManager.load();

		if (!stored) {
			await signOut();

			throw new Error('Não há refresh token para renovar a sessão');
		}

		try {
			const { accessToken } = await AuthService.refreshToken({
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

	const startSession = useCallback(
		async ({ customer: signedInCustomer, session }: IAuthSessionResponse) => {
			await activateSession({
				accessToken: session.accessToken,
				refreshToken: session.refreshToken
			});

			setCustomer(signedInCustomer);
		},
		[activateSession]
	);

	useEffect(() => {
		async function restoreSession() {
			const tokens = await AuthTokensManager.load();

			if (tokens) {
				await activateSession(tokens);

				const restoredCustomer = await AuthService.getMe().catch(() => null);

				setCustomer(restoredCustomer);
			}

			setIsRestoringSession(false);
		}

		restoreSession();
	}, [activateSession]);

	if (isRestoringSession) {
		return null;
	}

	return (
		<AuthContext.Provider value={{ customer, signedIn: !!customer, startSession, signOut }}>
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
