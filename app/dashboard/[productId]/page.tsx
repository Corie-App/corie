import { db } from '@/lib/postgres';
import NewAnnouncementModal from './ui/new-announcement-modal';
import { announcements } from '@/lib/postgres/schema';
import { eq } from 'drizzle-orm';
import { Card, CardTitle } from '@/ui/card';
import { Switch } from '@/ui/switch';

export default async function ProductPage({ params }: { params: { productId: string } }) {
	const data = await db.select().from(announcements).where(eq(announcements.productId, params.productId));

	return (
		<div className='pt-6 space-y-6'>
			<NewAnnouncementModal productId={params.productId} />
			<div className='space-y-4'>
				{data.map((announcement) => (
					<Card key={announcement.id} className='flex items-center justify-between p-4'>
						<CardTitle>{announcement.title}</CardTitle>
						<Switch defaultChecked={announcement.isActive} />
					</Card>
				))}
			</div>
		</div>
	);
}
