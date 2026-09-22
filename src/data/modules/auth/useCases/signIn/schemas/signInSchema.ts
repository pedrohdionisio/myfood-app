import { z } from 'zod';

export const signInSchema = z.object({
	email: z.email('Formato de e-mail inválido').max(254, 'O e-mail é muito longo'),
	password: z.string().min(1, 'Informe sua senha').max(128)
});

export type SignInFormType = z.infer<typeof signInSchema>;
