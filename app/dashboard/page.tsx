import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import NewProductModal from './ui/new-product-modal';

export default async function DashboardPage() {
	const { userId } = auth();
	const data = await db.select().from(products).where(eq(products.creatorId, userId!));

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold'>Your Products</h1>
				<NewProductModal />
			</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
