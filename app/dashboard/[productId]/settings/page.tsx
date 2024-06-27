import { db } from '@/lib/postgres';
import { products } from '@/lib/postgres/schema';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { UrlInput } from '@/ui/url-input';
import { eq } from 'drizzle-orm';
import { Code } from 'lucide-react';
import { notFound } from 'next/navigation';
import UpdateProduct from './ui/update-product';

export default async function SettingsPage({ params }: { params: { productId: string } }) {
	const product = await db.query.products.findFirst({
		where: eq(products.id, params.productId),
	});

	if (!product) return notFound();

	const code = `<script async type="text/javascript" src="/corie.js?s=${product.scriptId}"></script>`;

	return (
		<div className='mt-12 space-y-8'>
			<div className='border border-gray-100 rounded-lg overflow-hidden'>
				<div className='flex justify-between items-center p-4 bg-neutral-50 border-b border-gray-100'>
					<span className='flex-grow flex flex-col'>
						<span className='text-sm font-medium text-gray-900'>Your Script Code</span>
						<span className='text-sm text-gray-500 pr-4'>
							Copy the code below and paste it into your website.
						</span>
					</span>
				</div>
				<div className='p-4'>
					<div className='relative p-4 overflow-auto text-sm bg-black rounded-lg text-muted-foreground'>
						<pre className='whitespace-pre'>
							<code>{code}</code>
						</pre>
					</div>
				</div>
				<div className='px-4 gap-2 bg-neutral-50 border-t border-gray-100 py-2 flex justify-end w-full'>
					<Button>
						<Code size={16} className='mr-2' />
						Copy Script Code
					</Button>
				</div>
			</div>
			<UpdateProduct id={product.id} name={product.name} domain={product.domain} />
		</div>
	);
}
