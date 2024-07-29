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

export default async function AnnouncementCustomizeLayoutPage({ children, params }: Props) {
	const announcement = await db
		.select({
			title: announcements.title,
			layout: announcements.layout,
			imageUrl: announcements.imageUrl,
			buttonStyle: announcements.buttonStyle,
			description: announcements.description,
			primaryColor: announcements.primaryColor,
			ctaButtonUrl: announcements.ctaButtonUrl,
			ctaButtonText: announcements.ctaButtonText,
			dismissButtonText: announcements.dismissButtonText,
			showDismissButton: announcements.showDismissButton,
		})
		.from(announcements)
		.where(eq(announcements.id, params.announcementId));
	if (!announcement[0]) return notFound();

	return (
		<AnnouncementProvider
			initialData={{
				title: announcement[0].title,
				layout: announcement[0].layout,
				imageUrl: announcement[0].imageUrl,
				buttonStyle: announcement[0].buttonStyle,
				description: announcement[0].description,
				primaryColor: announcement[0].primaryColor,
				ctaButtonUrl: announcement[0].ctaButtonUrl,
				ctaButtonText: announcement[0].ctaButtonText,
				dismissButtonText: announcement[0].dismissButtonText,
				showDismissButton: announcement[0].showDismissButton,
			}}>
			<div className='grow flex flex-col lg:flex-row overflow-hidden'>
				{children}
				<div className='flex flex-1 items-center justify-center'>
					<AnnouncementPreview />
				</div>
			</div>
		</AnnouncementProvider>
	);
}
