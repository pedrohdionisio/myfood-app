import { Input } from 'presentation/components/Input/Input';
import { View } from 'react-native';
import type { IAddressFormFieldsProps } from './AddressFormFieldsTypes';

export function AddressFormFields({ control }: IAddressFormFieldsProps) {
	return (
		<View className='gap-4'>
			<Input
				control={control}
				keyboardType='number-pad'
				label='CEP'
				name='zipCode'
				placeholder='Somente números'
			/>

			<Input control={control} label='Rua' name='street' placeholder='Nome da rua' />

			<View className='flex-row gap-4'>
				<View className='flex-1'>
					<Input
						control={control}
						keyboardType='number-pad'
						label='Número'
						name='number'
						placeholder='123'
					/>
				</View>

				<View className='flex-1'>
					<Input
						control={control}
						label='Complemento'
						name='complement'
						placeholder='Apto, bloco'
					/>
				</View>
			</View>

			<Input control={control} label='Bairro' name='neighborhood' placeholder='Seu bairro' />

			<View className='flex-row gap-4'>
				<View className='flex-1'>
					<Input control={control} label='Cidade' name='city' placeholder='Sua cidade' />
				</View>

				<View className='w-24'>
					<Input
						autoCapitalize='characters'
						control={control}
						label='UF'
						maxLength={2}
						name='state'
						placeholder='SP'
					/>
				</View>
			</View>

			<Input
				control={control}
				label='Apelido (opcional)'
				name='label'
				placeholder='Casa, trabalho'
			/>

			<Input
				control={control}
				label='Referência (opcional)'
				name='reference'
				placeholder='Perto de...'
			/>
		</View>
	);
}
