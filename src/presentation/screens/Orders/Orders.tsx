import { AppText } from 'presentation/components/AppText/AppText';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { OrderCard } from './components/OrderCard/OrderCard';
import { OrdersPlaceholder } from './components/OrdersPlaceholder/OrdersPlaceholder';
import { useOrdersController } from './useOrdersController';

export function Orders() {
	const {
		rows,
		contentPadding,
		listState,
		errorMessage,
		isFetchingMoreOrders,
		isRefreshing,
		handleOpenOrder,
		handleRetry,
		handleEndReached,
		handleRefresh
	} = useOrdersController();

	return (
		<View className='flex-1 bg-background'>
			<FlatList
				ListEmptyComponent={
					<OrdersPlaceholder
						errorMessage={errorMessage}
						listState={listState}
						onRetry={handleRetry}
					/>
				}
				ListFooterComponent={
					isFetchingMoreOrders ? (
						<ActivityIndicator className='py-4' color={COLORS.brand.DEFAULT} />
					) : null
				}
				ListHeaderComponent={
					<AppText className='mb-4' color='strong' size='titleMd' weight='semibold'>
						Meus pedidos
					</AppText>
				}
				contentContainerClassName='gap-3 px-6'
				contentContainerStyle={contentPadding}
				data={rows}
				keyExtractor={(row) => row.id}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.4}
				refreshControl={
					<RefreshControl
						onRefresh={handleRefresh}
						refreshing={isRefreshing}
						tintColor={COLORS.brand.DEFAULT}
					/>
				}
				renderItem={({ item }) =>
					item.kind === 'section' ? (
						<AppText className='mt-2' color='muted' size='label' weight='medium'>
							{item.title}
						</AppText>
					) : (
						<OrderCard
							onPress={() => handleOpenOrder({ orderId: item.order.id })}
							order={item.order}
						/>
					)
				}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
