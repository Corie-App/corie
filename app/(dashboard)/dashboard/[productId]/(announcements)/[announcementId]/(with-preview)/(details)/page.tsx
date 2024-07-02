import { db } from '@/lib/postgres';
import { announcements } from '@/lib/postgres/schema';
import { eq } from 'drizzle-orm';
import DetailsForm from './ui/details-form';

interface Props {
	params: { productId: string; announcementId: string };
}

export default async function AnnouncementPage({ params }: Props) {
	const data = await db
		.select({ title: announcements.title, description: announcements.description })
		.from(announcements)
		.where(eq(announcements.id, params.announcementId));

	return (
		<DetailsForm
			title={data[0].title}
			productId={params.productId}
			description={data[0].description}
			announcementId={params.announcementId}
		/>
	);
}
