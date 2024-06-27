import { currentUser } from '@clerk/nextjs/server';
import { createServerActionProcedure } from 'zsa';
import { db } from './postgres';
import { products } from './postgres/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const authenticatedProcedure = createServerActionProcedure().handler(async () => {
	try {
		const user = await currentUser();
		if (!user) throw new Error('User not authenticated');

		return {
			user: {
				id: user.id,
				name: user.fullName,
				email: user.emailAddresses[0].emailAddress,
			},
		};
	} catch {
		throw new Error('There was an error authenticating the user');
	}
});

export const isProductAdminProcedure = createServerActionProcedure(authenticatedProcedure)
	.input(z.object({ productId: z.string() }))
	.handler(async ({ ctx, input }) => {
		try {
			const data = await db
				.select({ creatorId: products.creatorId })
				.from(products)
				.where(eq(products.id, input.productId));

			if (data[0].creatorId !== ctx.user.id) throw new Error("You don't have the proper permission ");

			return ctx;
		} catch {
			throw new Error('There was an error checking the user permissions for the product');
		}
	});
