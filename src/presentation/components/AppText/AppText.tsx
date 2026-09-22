import { Text } from 'react-native';
import { cn } from 'shared/utils/cn';
import type { IAppTextProps } from './AppTextTypes';
import { appTextVariants } from './appTextVariants';

export function AppText({ size, weight, color, align, className, ...props }: IAppTextProps) {
	return (
		<Text className={cn(appTextVariants({ size, weight, color, align }), className)} {...props} />
	);
}
