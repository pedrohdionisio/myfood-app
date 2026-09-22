import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import type { IAddressCardProps } from './AddressCardTypes';

export function AddressCard({ address, onSetDefault, onEdit, onDelete }: IAddressCardProps) {
	return (
		<View className='gap-3 rounded-xl border border-gray-200 bg-white p-4'>
			<View className='flex-row items-center gap-2'>
				<AppText color='strong' size='bodyMd' weight='semibold'>
					{address.label ?? 'Endereço'}
				</AppText>

				{address.isDefault && (
					<View className='rounded-lg bg-brand-subtle px-2 py-0.5'>
						<AppText color='brand' size='label' weight='medium'>
							Padrão
						</AppText>
					</View>
				)}
			</View>

			<View className='gap-0.5'>
				<AppText color='muted' size='bodySm'>
					{address.street}, {address.number}
					{address.complement ? ` — ${address.complement}` : ''}
				</AppText>

				<AppText color='muted' size='bodySm'>
					{address.neighborhood} · {address.city}/{address.state}
				</AppText>
			</View>

			<View className='flex-row gap-4'>
				{!address.isDefault && (
					<Pressable accessibilityRole='button' hitSlop={8} onPress={onSetDefault}>
						<AppText color='brand' size='bodySm' weight='medium'>
							Tornar padrão
						</AppText>
					</Pressable>
				)}

				<Pressable accessibilityRole='button' hitSlop={8} onPress={onEdit}>
					<AppText color='default' size='bodySm' weight='medium'>
						Editar
					</AppText>
				</Pressable>

				<Pressable accessibilityRole='button' hitSlop={8} onPress={onDelete}>
					<AppText color='destructive' size='bodySm' weight='medium'>
						Excluir
					</AppText>
				</Pressable>
			</View>
		</View>
	);
}
