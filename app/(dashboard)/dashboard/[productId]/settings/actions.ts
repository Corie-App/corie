'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { revalidatePath } from 'next/cache';
import { DeleteProductSchema, UpdateProductSchema } from '@/schemas/products';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export const updateProductAction = isProductAdminProcedure
	.createServerAction()
	.input(UpdateProductSchema, { type: 'formData' })
	.handler(async ({ input }) => {
		await db
			.update(products)
			.set({ name: input.name, domain: input.domain })
			.where(eq(products.id, input.productId))
			.returning({ id: products.id });

		revalidatePath('/dashboard');
		revalidatePath(`/dashboard/${input.productId}/settings`);

		return { success: true };
	});

export const deleteProductAction = isProductAdminProcedure
	.createServerAction()
	.input(DeleteProductSchema, { type: 'formData' })
	.handler(async ({ input }) => {
		await db.delete(products).where(eq(products.id, input.productId)).returning({ id: products.id });
		// delete data from kv and tinybird

		revalidatePath('/dashboard');
		redirect('/dashboard');
		return { success: true };
	});
