import { db } from '@/lib/postgres';
import { announcements } from '@/lib/postgres/schema';
import { eq } from 'drizzle-orm';
import ActiveToggle from './active-toggle';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default async function AnnouncementsList({ productId }: { productId: string }) {
	const data = await db.select().from(announcements).where(eq(announcements.productId, productId));

	return !data.length ? (
		<div className='bg-white p-4 border-r border-gray-100 min-w-[250px] text-muted-foreground text-center'>
			Create an announcement to get started
		</div>
	) : (
		<ul className='divide-y divide-gray-100 bg-white py-4 border-r border-gray-100 min-w-[250px]'>
			{data.map((announcement) => (
				<li key={announcement.id} className='py-2 px-4 flex gap-3 items-center justify-between'>
					<Link
						href={`/dashboard/${productId}/${announcement.id}`}
						className='group gap-2 justify-between items-center inline-flex text-sm font-medium grow p-2 hover:bg-gray-100 rounded-md text-foreground'>
						{announcement.title}
						<Eye
							size={16}
							className='text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 duration-150'
						/>
					</Link>
					<ActiveToggle
						productId={productId}
						isActive={announcement.isActive}
						announcementId={announcement.id}
					/>
				</li>
			))}
		</ul>
	);
}
