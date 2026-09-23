import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { FlatList, RefreshControl, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { AddressCard } from './components/AddressCard/AddressCard';
import { AddressesPlaceholder } from './components/AddressesPlaceholder/AddressesPlaceholder';
import { useAddressesController } from './useAddressesController';

export function Addresses() {
	const {
		addresses,
		contentPadding,
		listState,
		errorMessage,
		actionErrorMessage,
		isRefreshing,
		handleSetDefault,
		handleDelete,
		handleEdit,
		handleAddAddress,
		handleRetry,
		handleGoBack,
		handleRefresh
	} = useAddressesController();

	return (
		<View className='flex-1 bg-background'>
			<FlatList
				ListEmptyComponent={
					<AddressesPlaceholder
						errorMessage={errorMessage}
						listState={listState}
						onAddAddress={handleAddAddress}
						onRetry={handleRetry}
					/>
				}
				ListFooterComponent={
					addresses.length > 0 ? (
						<Button
							className='mt-4'
							onPress={handleAddAddress}
							title='Cadastrar endereço'
							variant='outline'
						/>
					) : null
				}
				ListHeaderComponent={
					<View className='mb-4 gap-4'>
						<ScreenHeader onBack={handleGoBack} title='Meus endereços' />

						{!!actionErrorMessage && (
							<AppText color='destructive' size='bodySm'>
								{actionErrorMessage}
							</AppText>
						)}
					</View>
				}
				contentContainerClassName='gap-3 px-6'
				contentContainerStyle={contentPadding}
				data={addresses}
				keyExtractor={(address) => address.id}
				refreshControl={
					<RefreshControl
						onRefresh={handleRefresh}
						refreshing={isRefreshing}
						tintColor={COLORS.brand.DEFAULT}
					/>
				}
				renderItem={({ item }) => (
					<AddressCard
						address={item}
						onDelete={() => handleDelete({ addressId: item.id })}
						onEdit={() => handleEdit({ addressId: item.id })}
						onSetDefault={() => handleSetDefault({ addressId: item.id })}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
