import type { IOrderSummary } from 'shared/entities/IOrderSummary';

export type OrdersListState = 'loading' | 'error' | 'empty';

export type OrdersListRow =
	| { kind: 'section'; id: string; title: string }
	| { kind: 'order'; id: string; order: IOrderSummary };

export interface IHandleOpenOrderParams {
	orderId: string;
}
