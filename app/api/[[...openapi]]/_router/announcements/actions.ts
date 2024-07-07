import { db } from '@/lib/postgres';
import { announcements, products } from '@/lib/postgres/schema';
import { scriptProcedure } from '@/lib/procedures';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

export const getAnnouncements = scriptProcedure
	.createServerAction()
	.input(z.object({ scriptId: z.string() }))
	.handler(async ({ input }) => {
		const data = await db
			.select()
			.from(announcements)
			.leftJoin(products, eq(announcements.productId, products.id))
			.where(and(eq(products.scriptId, input.scriptId), eq(announcements.isActive, true)))
			.execute();

		return data.map((a) => ({
			title: a.announcements.title,
			layout: a.announcements.layout,
			description: a.announcements.description,
			buttonStyle: a.announcements.buttonStyle,
			primaryColor: a.announcements.primaryColor,
		}));
	});
