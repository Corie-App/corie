'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { announcements } from '@/lib/postgres/schema';
import { UpdateAnnouncementThemeSchema } from '@/schemas/announcement';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const updateAnnouncemenThemetAction = isProductAdminProcedure
	.createServerAction()
	.input(UpdateAnnouncementThemeSchema, { type: 'formData' })
	.handler(async ({ input }) => {
		await db
			.update(announcements)
			.set({ buttonStyle: input.buttonStyle })
			.where(eq(announcements.id, input.announcementId))
			.returning({ id: announcements.id });

		revalidatePath(`/dashboard/${input.productId}/${input.announcementId}/theme`);
		return { success: true };
	});
