import { z } from 'zod';

export const CreateProductSchema = z.object({
	name: z.string(),
	domain: z.string().url(),
});
