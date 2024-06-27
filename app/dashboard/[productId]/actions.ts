'use server';

import { isProductAdminProcedure } from '@/lib/procedures';
import { db } from '@/lib/postgres';
import { announcements } from '@/lib/postgres/schema';
import { generateEntityId } from '@/lib/generate-entity-id';
import { CreateAnnouncementSchema } from '@/schemas/announcement';
import { revalidatePath } from 'next/cache';

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
