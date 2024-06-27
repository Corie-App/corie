'use server';

import { authenticatedProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { generateEntityId } from '@/lib/generate-entity-id';
import { nanoid } from '@/lib/nanoid';
import { redirect } from 'next/navigation';
import { CreateProductSchema } from '@/schemas/products';

export const createProductAction = authenticatedProcedure
	.createServerAction()
	.input(CreateProductSchema, { type: 'formData' })
	.handler(async ({ input, ctx }) => {
		const newProduct = await db
			.insert(products)
			.values({
				...input,
				id: generateEntityId('product'),
				scriptId: nanoid(),
				createdAt: new Date(),
				creatorId: ctx.user.id,
			})
			.returning({ id: products.id });

		redirect(`/dashboard/${newProduct[0].id}`);
	});
