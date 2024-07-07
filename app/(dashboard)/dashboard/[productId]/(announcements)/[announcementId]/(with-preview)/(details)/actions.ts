'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { announcements } from '@/lib/postgres/schema';
import { UpdateAnnouncementSchema } from '@/schemas/announcement';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const updateAnnouncementAction = isProductAdminProcedure
	.createServerAction()
	.input(UpdateAnnouncementSchema, { type: 'formData' })
	.handler(async ({ input }) => {
		await db
			.update(announcements)
			.set({ title: input.title, description: input.description })
			.where(eq(announcements.id, input.announcementId))
			.returning({ id: announcements.id });

		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/details`);
		return { success: true };
	});
