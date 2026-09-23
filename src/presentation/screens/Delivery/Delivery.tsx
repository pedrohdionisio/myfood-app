import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { EmptyState } from 'presentation/components/EmptyState/EmptyState';
import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { DeliveryConfirmForm } from './components/DeliveryConfirmForm/DeliveryConfirmForm';
import { DeliveryCustomerCard } from './components/DeliveryCustomerCard/DeliveryCustomerCard';
import { DeliveryPaymentCard } from './components/DeliveryPaymentCard/DeliveryPaymentCard';
import { useDeliveryController } from './useDeliveryController';

export function Delivery() {
	const {
		orderId,
		delivery,
		isLoadingDelivery,
		isFailingDelivery,
		isRefreshing,
		errorMessage,
		actionErrorMessage,
		hasError,
		isMissing,
		handleGoBack,
		handleConfirmed,
		handleCallCustomer,
		handleOpenMap,
		handleFailDelivery,
		handleRetry,
		handleRefresh
	} = useDeliveryController();

	return (
		<ScreenLayout className='gap-4' isRefreshing={isRefreshing} onRefresh={handleRefresh}>
			<ScreenHeader
				onBack={handleGoBack}
				title={delivery ? `Entrega #${delivery.displayNumber}` : 'Entrega'}
			/>

			{isLoadingDelivery && (
				<View className='gap-3'>
					<Skeleton className='h-40 w-full' />
					<Skeleton className='h-24 w-full' />
					<Skeleton className='h-32 w-full' />
				</View>
			)}

			{hasError && (
				<ErrorState actionTitle='Tentar de novo' message={errorMessage} onAction={handleRetry} />
			)}

			{isMissing && (
				<EmptyState
					actionTitle='Voltar'
					description='Ela já foi encerrada ou não está mais com você.'
					onAction={handleGoBack}
					title='Esta entrega não está mais em rota'
				/>
			)}

			{!!delivery && (
				<>
					<DeliveryCustomerCard
						delivery={delivery}
						onCallCustomer={handleCallCustomer}
						onOpenMap={handleOpenMap}
					/>

					<DeliveryPaymentCard delivery={delivery} />

					<DeliveryConfirmForm onConfirmed={handleConfirmed} orderId={orderId} />

					{!!actionErrorMessage && (
						<AppText color='destructive' size='bodySm'>
							{actionErrorMessage}
						</AppText>
					)}

					<Button
						isLoading={isFailingDelivery}
						onPress={handleFailDelivery}
						title='Entrega frustrada'
						variant='outline'
					/>
				</>
			)}
		</ScreenLayout>
	);
}
