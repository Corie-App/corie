'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { announcements } from '@/lib/postgres/schema';
import { generateEntityId } from '@/lib/generate-entity-id';
import { CreateAnnouncementSchema, ToggleAnnouncementActiveSchema } from '@/schemas/announcement';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export const createAnnouncementAction = isProductAdminProcedure
	.createServerAction()
	.input(CreateAnnouncementSchema, { type: 'formData' })
	.handler(async ({ input, ctx }) => {
		await db
			.insert(announcements)
			.values({
				...input,
				id: generateEntityId('announcement'),
				creatorId: ctx.user.id,
			})
			.returning({ id: announcements.id });

		revalidatePath(`/dashboard/${input.productId}`);
	});

export const toggleAnnouncementActiveAction = isProductAdminProcedure
	.createServerAction()
	.input(ToggleAnnouncementActiveSchema)
	.handler(async ({ input, ctx }) => {
		await db
			.update(announcements)
			.set({ isActive: input.isActive })
			.where(eq(announcements.id, input.announcementId))
			.returning({ id: announcements.id });

		revalidatePath(`/dashboard/${input.productId}`);
		return { isActive: input.isActive };
	});
