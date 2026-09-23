import { z } from 'zod';

export const requestRecoveryCodeSchema = z.object({
	email: z.email('Formato de e-mail inválido').max(254, 'O e-mail é muito longo')
});

export type RequestRecoveryCodeFormType = z.infer<typeof requestRecoveryCodeSchema>;
