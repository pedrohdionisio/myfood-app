import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { OrderDeliveryCode } from './components/OrderDeliveryCode/OrderDeliveryCode';
import { OrderItemsCard } from './components/OrderItemsCard/OrderItemsCard';
import { OrderReviewSection } from './components/OrderReviewSection/OrderReviewSection';
import { OrderStatusCard } from './components/OrderStatusCard/OrderStatusCard';
import { useOrderController } from './useOrderController';

export function Order() {
	const {
		order,
		isLoadingOrder,
		isCancelingOrder,
		errorMessage,
		actionErrorMessage,
		canCancel,
		shouldShowDeliveryCode,
		shouldShowPayment,
		shouldShowReview,
		review,
		isLoadingReview,
		reviewErrorMessage,
		handleCancel,
		handleGoToPayment,
		handleGoToReview,
		handleRetry,
		handleGoBack
	} = useOrderController();

	return (
		<ScreenLayout className='gap-4'>
			<ScreenHeader onBack={handleGoBack} title='Pedido' />

			{isLoadingOrder && (
				<View className='gap-3'>
					<Skeleton className='h-32 w-full' />
					<Skeleton className='h-24 w-full' />
					<Skeleton className='h-40 w-full' />
				</View>
			)}

			{!order && !isLoadingOrder && (
				<ErrorState actionTitle='Tentar de novo' message={errorMessage} onAction={handleRetry} />
			)}

			{!!order && (
				<>
					<OrderStatusCard order={order} />

					{shouldShowPayment && <Button onPress={handleGoToPayment} title='Pagar com Pix' />}

					{shouldShowDeliveryCode && <OrderDeliveryCode deliveryCode={order.deliveryCode} />}

					{shouldShowReview && (
						<OrderReviewSection
							errorMessage={reviewErrorMessage}
							isLoading={isLoadingReview}
							onReview={handleGoToReview}
							review={review}
						/>
					)}

					<OrderItemsCard order={order} />

					{!!order.notes && (
						<View className='gap-1 rounded-xl border border-gray-200 bg-white p-4'>
							<AppText color='muted' size='label' weight='medium'>
								Observação
							</AppText>

							<AppText color='default' size='bodySm'>
								{order.notes}
							</AppText>
						</View>
					)}

					{!!actionErrorMessage && (
						<AppText color='destructive' size='bodySm'>
							{actionErrorMessage}
						</AppText>
					)}

					{canCancel && (
						<Button
							isLoading={isCancelingOrder}
							onPress={handleCancel}
							title='Cancelar pedido'
							variant='outline'
						/>
					)}
				</>
			)}
		</ScreenLayout>
	);
}
