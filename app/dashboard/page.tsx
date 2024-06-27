import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import NewProductModal from './ui/new-product-modal';

export default async function DashboardPage() {
	const { userId } = auth();
	const data = await db.select().from(products).where(eq(products.creatorId, userId!));

	return (
		<div className='p-4 space-y-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold'>Your Products</h1>
				<NewProductModal />
			</div>
			<div className=''>
				{data.map((product) => (
					<div key={product.id} className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<h2 className='text-xl font-bold'>{product.name}</h2>
						</div>
						<div className='flex items-center space-x-2'>
							<a href={`/dashboard/${product.id}`} className='text-blue-500 hover:underline'>
								View
							</a>
							<a href={`/dashboard/${product.id}/edit`} className='text-blue-500 hover:underline'>
								Edit
							</a>
						</div>
					</div>
				))}
			</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
