import { Text } from 'react-native';
import { cn } from 'shared/utils/cn';
import { appTextVariants } from './AppTextStyles';
import type { IAppTextProps } from './AppTextTypes';

export function AppText({ size, weight, color, align, className, ...props }: IAppTextProps) {
	return (
		<Text className={cn(appTextVariants({ size, weight, color, align }), className)} {...props} />
	);
}
