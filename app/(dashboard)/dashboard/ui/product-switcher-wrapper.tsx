import { auth } from '@clerk/nextjs/server';
import { products } from '@/lib/postgres/schema';
import { db } from '@/lib/postgres';
import { eq } from 'drizzle-orm';
import ProductSwitcher from './product-switcher';

export default async function ProductSwitcherWrapper() {
	const { userId } = auth();

	const data = await db
		.select({ id: products.id, name: products.name })
		.from(products)
		.where(eq(products.creatorId, userId!));

	return <ProductSwitcher products={data} />;
}
