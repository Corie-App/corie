import { z } from 'zod';

export const CreateProductSchema = z.object({
	name: z.string(),
	domain: z.string().url(),
});

export const UpdateProductSchema = CreateProductSchema.extend({
	productId: z.string(),
});
