import { FlatList, RefreshControl, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { DeliveriesHeader } from './components/DeliveriesHeader/DeliveriesHeader';
import { DeliveriesPlaceholder } from './components/DeliveriesPlaceholder/DeliveriesPlaceholder';
import { DeliveryCard } from './components/DeliveryCard/DeliveryCard';
import { useDeliveriesController } from './useDeliveriesController';

export function Deliveries() {
	const {
		deliveries,
		driverName,
		contentPadding,
		listState,
		errorMessage,
		isRefreshing,
		handleOpenDelivery,
		handleRefresh,
		handleSignOut
	} = useDeliveriesController();

	return (
		<View className='flex-1 bg-background'>
			<FlatList
				ListEmptyComponent={
					<DeliveriesPlaceholder
						errorMessage={errorMessage}
						listState={listState}
						onRetry={handleRefresh}
					/>
				}
				ListHeaderComponent={<DeliveriesHeader driverName={driverName} onSignOut={handleSignOut} />}
				contentContainerClassName='gap-3 px-6'
				contentContainerStyle={contentPadding}
				data={deliveries}
				keyExtractor={(delivery) => delivery.id}
				refreshControl={
					<RefreshControl
						onRefresh={handleRefresh}
						refreshing={isRefreshing}
						tintColor={COLORS.brand.DEFAULT}
					/>
				}
				renderItem={({ item }) => (
					<DeliveryCard delivery={item} onPress={() => handleOpenDelivery({ orderId: item.id })} />
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
