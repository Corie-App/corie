import { currentUser } from '@clerk/nextjs/server';
import { createServerActionProcedure } from 'zsa';
import { db } from './postgres';
import { products } from './postgres/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { verifyToken } from './verify-token';

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

export const scriptProcedure = createServerActionProcedure().handler(async ({ request }) => {
	// This procedure is used to ensure api calls are coming only from the internal script
	try {
		const tokenHeader = request?.headers.get('X-Script-Token');
		if (!tokenHeader) throw new Error('Missing token');

		if (!verifyToken(tokenHeader)) {
			throw new Error('Invalid or expired token');
		}
	} catch {
		throw new Error('Unauthorized request');
	}
});
