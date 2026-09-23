import type { PropsWithChildren } from 'react';

export interface IScreenLayoutProps extends PropsWithChildren {
	className?: string;
	isRefreshing?: boolean;
	onRefresh?: () => void;
}
