import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { AUTH_PROFILES, type AuthProfile } from 'shared/constants/authProfiles';
import { cn } from 'shared/utils/cn';
import type { IProfileSelectorProps } from './ProfileSelectorTypes';

const PROFILE_LABELS: Record<AuthProfile, string> = {
	customer: 'Sou cliente',
	driver: 'Sou entregador'
};

export function ProfileSelector({ selectedProfile, onSelect }: IProfileSelectorProps) {
	return (
		<View
			accessibilityRole='radiogroup'
			className='mt-10 flex-row gap-1 rounded-xl border border-gray-200 bg-white p-1'
		>
			{AUTH_PROFILES.map((profile) => {
				const isSelected = profile === selectedProfile;

				return (
					<Pressable
						accessibilityRole='radio'
						accessibilityState={{ checked: isSelected }}
						className={cn(
							'h-10 flex-1 items-center justify-center rounded-lg active:opacity-80',
							isSelected && 'bg-brand-subtle'
						)}
						key={profile}
						onPress={() => onSelect(profile)}
					>
						<AppText
							color={isSelected ? 'brand' : 'muted'}
							size='bodySm'
							weight={isSelected ? 'semibold' : 'medium'}
						>
							{PROFILE_LABELS[profile]}
						</AppText>
					</Pressable>
				);
			})}
		</View>
	);
}
