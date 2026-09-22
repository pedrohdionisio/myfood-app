import type { ImageProps } from 'expo-image';

export interface IAppImageProps extends ImageProps {
	className?: string;
	fallbackIconSize?: number;
}
