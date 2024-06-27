import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { auth } from '@clerk/nextjs/server';
import { eq, desc } from 'drizzle-orm';
import NewProductModal from './ui/new-product-modal';
import { Card } from '@/ui/card';
import { Button } from '@/ui/button';
import { Globe } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
	const { userId } = auth();
	const data = await db
		.select()
		.from(products)
		.where(eq(products.creatorId, userId!))
		.orderBy(desc(products.updatedAt));

	return (
		<div className='p-4 space-y-12'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold'>Your Products</h1>
				<NewProductModal />
			</div>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{data.map((p) => (
					<Card key={p.id} className='p-4'>
						<div className='flex justify-between items-center'>
							<div>
								<h3 className='text-lg font-medium'>{p.name}</h3>
								<span className='inline-flex gap-1 items-center text-muted-foreground'>
									<Globe size={16} />
									{p.domain}
								</span>
							</div>

							<Link href={`/dashboard/${p.id}`}>
								<Button size='sm' variant='secondary'>
									View
								</Button>
							</Link>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
