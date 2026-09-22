import { SearchIcon } from 'lucide-react-native';
import { TextInput, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { ISearchFieldProps } from './SearchFieldTypes';

export function SearchField({ value, onChangeText }: ISearchFieldProps) {
	return (
		<View className='h-12 flex-1 flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white px-4'>
			<SearchIcon color={COLORS.gray[400]} size={18} strokeWidth={1.8} />

			<TextInput
				autoCapitalize='none'
				autoCorrect={false}
				className='h-full flex-1 font-inter-regular text-body-md text-gray-900'
				onChangeText={onChangeText}
				placeholder='Busque por restaurante'
				placeholderTextColor={COLORS.gray[400]}
				returnKeyType='search'
				value={value}
			/>
		</View>
	);
}
