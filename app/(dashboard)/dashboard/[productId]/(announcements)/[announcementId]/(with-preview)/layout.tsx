import { PropsWithChildren } from 'react';
import AnnouncementProvider from './ui/provider';
import { db } from '@/lib/postgres';
import { announcements } from '@/lib/postgres/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import AnnouncementPreview from './ui/announcement-preview';

interface Props extends PropsWithChildren {
	params: { announcementId: string };
}

export default async function AnnouncementLayoutPage({ children, params }: Props) {
	const announcement = await db
		.select({ title: announcements.title, description: announcements.description })
		.from(announcements)
		.where(eq(announcements.id, params.announcementId));
	if (!announcement[0]) return notFound();

	return (
		<AnnouncementProvider
			initialData={{
				title: announcement[0].title,
				description: announcement[0].description,
			}}>
			<div className='flex flex-col flex-1'>
				{children}
				<AnnouncementPreview />
			</div>
		</AnnouncementProvider>
	);
}
