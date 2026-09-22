import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ErrorState } from 'presentation/components/ErrorState/ErrorState';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { formatDateTime } from 'shared/utils/formatDateTime';
import { formatPrice } from 'shared/utils/formatPrice';
import { usePaymentController } from './usePaymentController';

export function Payment() {
	const { payment, hasCopied, isLoadingPayment, errorMessage, handleCopyCode, handleGoToOrder } =
		usePaymentController();

	return (
		<ScreenLayout className='gap-6'>
			<View className='gap-2'>
				<AppText color='strong' size='titleMd' weight='semibold'>
					Pague com Pix
				</AppText>

				<AppText color='muted'>
					Copie o código e pague no app do seu banco. A confirmação chega sozinha.
				</AppText>
			</View>

			{isLoadingPayment && (
				<View className='gap-3'>
					<Skeleton className='h-24 w-full' />
					<Skeleton className='h-12 w-full' />
				</View>
			)}

			{!!errorMessage && !payment && <ErrorState message={errorMessage} />}

			{!!payment && (
				<>
					<View className='gap-3 rounded-xl border border-gray-200 bg-white p-4'>
						<AppText color='muted' size='label' weight='medium'>
							Valor
						</AppText>

						<AppText color='strong' size='titleLg' weight='semibold'>
							{formatPrice(payment.amountCents)}
						</AppText>

						<AppText color='muted' size='bodySm'>
							Código válido até {formatDateTime(payment.expiresAt)}
						</AppText>
					</View>

					<View className='gap-2'>
						<AppText color='muted' size='label' weight='medium'>
							Pix copia e cola
						</AppText>

						<View className='rounded-xl border border-gray-200 bg-white p-4'>
							<AppText color='default' numberOfLines={3} size='bodySm'>
								{payment.brCode}
							</AppText>
						</View>
					</View>

					<Button onPress={handleCopyCode} title={hasCopied ? 'Código copiado' : 'Copiar código'} />

					{payment.status === 'EXPIRED' && (
						<AppText color='destructive' size='bodySm'>
							Este código expirou. Volte ao pedido para ver o que fazer.
						</AppText>
					)}

					<Button onPress={handleGoToOrder} title='Ver pedido' variant='ghost' />
				</>
			)}
		</ScreenLayout>
	);
}
