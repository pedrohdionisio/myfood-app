import type { SvgProps } from 'react-native-svg';

export interface ILogoProps extends Omit<SvgProps, 'width' | 'height' | 'viewBox'> {
	height?: number;
}
