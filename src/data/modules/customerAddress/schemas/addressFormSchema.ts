import type { ICreateAddressPayload } from 'data/modules/customerAddress/types/CustomerAddressTypes';
import { onlyDigits } from 'shared/utils/onlyDigits';
import { z } from 'zod';

const addressFormFields = z.object({
	label: z.string().trim().max(40, 'O apelido deve ter no máximo 40 caracteres'),
	zipCode: z
		.string()
		.transform(onlyDigits)
		.refine((value) => value.length === 8, 'Informe o CEP com 8 dígitos'),
	street: z.string().trim().min(2, 'Informe a rua').max(160, 'A rua é muito longa'),
	number: z.string().trim().min(1, 'Informe o número').max(20, 'O número é muito longo'),
	complement: z.string().trim().max(80, 'O complemento deve ter no máximo 80 caracteres'),
	neighborhood: z.string().trim().min(2, 'Informe o bairro').max(80, 'O bairro é muito longo'),
	city: z.string().trim().min(2, 'Informe a cidade').max(80, 'A cidade é muito longa'),
	state: z
		.string()
		.trim()
		.toUpperCase()
		.refine((value) => /^[A-Z]{2}$/.test(value), 'Informe a UF com 2 letras'),
	reference: z.string().trim().max(160, 'A referência deve ter no máximo 160 caracteres')
});

export const addressFormSchema = addressFormFields.transform(
	(values): ICreateAddressPayload => ({
		label: values.label || undefined,
		zipCode: values.zipCode,
		street: values.street,
		number: values.number,
		complement: values.complement || undefined,
		neighborhood: values.neighborhood,
		city: values.city,
		state: values.state,
		reference: values.reference || undefined
	})
);

export type AddressFormType = z.input<typeof addressFormSchema>;
export type AddressPayloadType = z.output<typeof addressFormSchema>;
