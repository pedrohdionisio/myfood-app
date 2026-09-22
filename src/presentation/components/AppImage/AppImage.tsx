import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import type { IAppImageProps } from './AppImageTypes';

const StyledImage = cssInterop(Image, { className: 'style' });

export function AppImage({ className, contentFit = 'cover', ...props }: IAppImageProps) {
	return <StyledImage className={className} contentFit={contentFit} {...props} />;
}
