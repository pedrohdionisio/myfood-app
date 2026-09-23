import { z } from 'zod';

export const confirmDeliverySchema = z.object({
	code: z.string().regex(/^\d{4}$/, 'O código tem 4 dígitos')
});

export type ConfirmDeliveryFormType = z.infer<typeof confirmDeliverySchema>;
