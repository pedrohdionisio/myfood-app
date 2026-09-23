import { StarIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IStarRatingProps } from './StarRatingTypes';

const STARS = [1, 2, 3, 4, 5];

export function StarRating({ rating, size = 14 }: IStarRatingProps) {
	return (
		<View
			accessibilityLabel={`Nota ${rating} de 5`}
			accessibilityRole='image'
			className='flex-row gap-0.5'
		>
			{STARS.map((star) => {
				const isFilled = star <= rating;

				return (
					<StarIcon
						color={isFilled ? COLORS.warning : COLORS.gray[300]}
						fill={isFilled ? COLORS.warning : 'transparent'}
						key={star}
						size={size}
						strokeWidth={1.8}
					/>
				);
			})}
		</View>
	);
}
