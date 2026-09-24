import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ORDER_QUERY_KEYS } from 'data/modules/order/keys/OrderKeys';
import { PAYMENT_QUERY_KEYS } from 'data/modules/payment/keys/PaymentKeys';
import { PaymentService } from 'data/modules/payment/services/PaymentService';

const POLL_INTERVAL_MS = 5000;

export function useGetPayment(orderId: string, isEnabled: boolean) {
	const queryClient = useQueryClient();

	const { data, isPending, error } = useQuery({
		queryKey: [PAYMENT_QUERY_KEYS.GET_PAYMENT, orderId],
		queryFn: async () => {
			const payment = await PaymentService.getByOrder(orderId);

			if (payment.status === 'PAID') {
				await Promise.all([
					queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEYS.GET_ORDER, orderId] }),
					queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEYS.LIST_ORDERS] })
				]);
			}

			return payment;
		},
		enabled: isEnabled,
		refetchInterval: (query) => (query.state.data?.status === 'PENDING' ? POLL_INTERVAL_MS : false)
	});

	return {
		payment: data ?? null,
		isLoadingPayment: isPending,
		paymentError: error
	};
}
