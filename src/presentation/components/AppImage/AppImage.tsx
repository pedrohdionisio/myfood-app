import { Image } from 'expo-image';
import { ImageIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import type { IAppImageProps } from './AppImageTypes';

const StyledImage = cssInterop(Image, { className: 'style' });

export function AppImage({
	className,
	contentFit = 'cover',
	fallbackIconSize = 24,
	source,
	...props
}: IAppImageProps) {
	if (!source) {
		return (
			<View className={cn('items-center justify-center bg-gray-100', className)}>
				<ImageIcon color={COLORS.gray[400]} size={fallbackIconSize} strokeWidth={1.5} />
			</View>
		);
	}

	return <StyledImage className={className} contentFit={contentFit} source={source} {...props} />;
}
