import { z } from 'zod';

export const CreateProductSchema = z.object({
	name: z.string(),
	domain: z.string(),
});

export const UpdateProductSchema = CreateProductSchema.extend({
	productId: z.string(),
});

export const DeleteProductSchema = z.object({
	productId: z.string(),
});