'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { revalidatePath } from 'next/cache';
import { UpdateProductSchema } from '@/schemas/products';
import { eq } from 'drizzle-orm';

export const updateProductAction = isProductAdminProcedure
	.createServerAction()
	.input(UpdateProductSchema, { type: 'formData' })
	.handler(async ({ input, ctx }) => {
		await db
			.update(products)
			.set({ name: input.name, domain: input.domain })
			.where(eq(products.id, input.productId))
			.returning({ id: products.id });

		revalidatePath(`/dashboard`);
		revalidatePath(`/dashboard/${input.productId}/settings`);
	});
