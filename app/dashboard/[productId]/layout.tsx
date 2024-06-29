import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import Link from 'next/link';
import { eq } from 'drizzle-orm';

export default async function ProductPageLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { productId: string };
}) {
	const data = await db.select().from(products).where(eq(products.id, params.productId));

	return (
		<div className='p-4'>
			<h2 className='text-2xl font-bold'>{data[0].name}</h2>
			<div className='flex items-center gap-2'>
				<Link href={`/dashboard/${params.productId}`} className='font-medium hover:underline'>
					Announcements
				</Link>
				<Link href={`/dashboard/${params.productId}/settings`} className='font-medium hover:underline'>
					Settings
				</Link>
			</div>
			{children}
		</div>
	);
}
