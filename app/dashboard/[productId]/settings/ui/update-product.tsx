'use client';

import { Product } from '@/lib/postgres/schema';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { UrlInput } from '@/ui/url-input';
import { useServerAction } from 'zsa-react';
import { updateProductAction } from '../actions';
import { toast } from 'sonner';

type Props = Pick<Product, 'id' | 'name' | 'domain'>;

export default function UpdateProduct({ id, name, domain }: Props) {
	const { executeFormAction, isPending, data } = useServerAction(updateProductAction, {
		onSuccess(data) {
			console.log(data);
			toast.success('Changes saved successfully');
		},
		onError(args) {
			console.error(args);
		},
	});

	return (
		<form action={executeFormAction} className='border border-gray-100 rounded-lg overflow-hidden'>
			<div className='flex justify-between items-center p-4 bg-neutral-50 border-b border-gray-100'>
				<span className='flex-grow flex flex-col'>
					<span className='text-sm font-medium text-gray-900'>Update Product</span>
					<span className='text-sm text-gray-500 pr-4'>Change your product&apos;s name and domain.</span>
				</span>
			</div>
			<div className='p-4 space-y-4'>
				<input type='hidden' name='productId' value={id} />
				<div className='space-y-1'>
					<Label htmlFor='name' className='text-right'>
						Product Name
					</Label>
					<Input required id='name' name='name' defaultValue={name} placeholder={name} />
				</div>
				<div className='space-y-1'>
					<Label htmlFor='domain' className='text-right'>
						Your domain
					</Label>
					<UrlInput required id='domain' name='domain' defaultValue={domain} placeholder={domain} />
					<span className='text-xs text-gray-500'>Announcements will be displayed on this domain</span>
				</div>
			</div>
			<div className='px-4 gap-2 bg-neutral-50 border-t border-gray-100 py-2 flex justify-end w-full'>
				<Button>{isPending ? 'Saving...' : 'Save Changes'}</Button>
			</div>
		</form>
	);
}
