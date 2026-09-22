import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PAYMENT_MUTATION_KEYS, PAYMENT_QUERY_KEYS } from 'data/modules/payment/keys/PaymentKeys';
import { PaymentService } from 'data/modules/payment/services/PaymentService';

export function useCreatePixPayment() {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [PAYMENT_MUTATION_KEYS.CREATE_PIX_PAYMENT],
		mutationFn: PaymentService.createPix,
		onSuccess: (payment) =>
			queryClient.setQueryData([PAYMENT_QUERY_KEYS.GET_PAYMENT, payment.orderId], payment)
	});

	return {
		createPixPayment: mutateAsync,
		isCreatingPixPayment: isPending
	};
}
