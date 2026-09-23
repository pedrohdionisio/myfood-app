import { z } from 'zod';

export const createReviewSchema = z.object({
	rating: z.number().int().min(1, 'Escolha uma nota de 1 a 5').max(5),
	comment: z
		.string()
		.trim()
		.max(1000, 'O comentário deve ter no máximo 1000 caracteres')
		.refine((value) => value === '' || value.length >= 3, 'Escreva pelo menos 3 caracteres')
		.transform((value) => value || undefined)
});

export type CreateReviewFormType = z.input<typeof createReviewSchema>;
export type CreateReviewPayloadType = z.output<typeof createReviewSchema>;
