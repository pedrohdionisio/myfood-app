import { onlyDigits } from 'shared/utils/onlyDigits';
import { z } from 'zod';

export const updateProfileSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(2, 'Informe seu nome')
			.max(120, 'O nome deve ter no máximo 120 caracteres'),
		phone: z.string()
	})
	.superRefine((values, ctx) => {
		const phoneDigits = onlyDigits(values.phone);

		if (phoneDigits !== '' && (phoneDigits.length < 10 || phoneDigits.length > 11)) {
			ctx.addIssue({
				code: 'custom',
				path: ['phone'],
				message: 'Informe um telefone válido com DDD'
			});
		}
	})
	.transform((values) => ({
		name: values.name,
		phone: onlyDigits(values.phone) || null
	}));

export type UpdateProfileFormType = z.input<typeof updateProfileSchema>;
export type UpdateProfilePayloadType = z.output<typeof updateProfileSchema>;
