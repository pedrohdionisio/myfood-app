import { useQuery } from '@tanstack/react-query';
import { PAYMENT_QUERY_KEYS } from 'data/modules/payment/keys/PaymentKeys';
import { PaymentService } from 'data/modules/payment/services/PaymentService';

const POLL_INTERVAL_MS = 5000;

export function useGetPayment(orderId: string, isEnabled: boolean) {
	const { data, isPending, error } = useQuery({
		queryKey: [PAYMENT_QUERY_KEYS.GET_PAYMENT, orderId],
		queryFn: () => PaymentService.getByOrder(orderId),
		enabled: isEnabled,
		refetchInterval: (query) => (query.state.data?.status === 'PENDING' ? POLL_INTERVAL_MS : false)
	});

	return {
		payment: data ?? null,
		isLoadingPayment: isPending,
		paymentError: error
	};
}
