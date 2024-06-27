'use server';

import { z } from 'zod';
import { authenticatedProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { generateEntityId } from '@/lib/generate-entity-id';
import { nanoid } from '@/lib/nanoid';
import { redirect } from 'next/navigation';

export const createProductAction = authenticatedProcedure
	.createServerAction()
	.input(z.object({ name: z.string() }), { type: 'formData' })
	.handler(async ({ input, ctx }) => {
		const newProduct = await db
			.insert(products)
			.values({
				id: generateEntityId('product'),
				name: input.name,
				scriptId: nanoid(),
				creatorId: ctx.user.id,
			})
			.returning({ id: products.id });

		redirect(`/dashboard/${newProduct[0].id}`);
	});
