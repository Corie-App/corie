'use client';

import { Product } from '@/lib/postgres/schema';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { useServerAction } from 'zsa-react';
import { deleteProductAction } from '../actions';
import { toast } from 'sonner';

type Props = Pick<Product, 'id' | 'name'>;

export default function DeleteProduct({ id, name }: Props) {
	const { executeFormAction, isPending } = useServerAction(deleteProductAction, {
		onSuccess() {
			toast.success('Product deleted successfully');
		},
		onError(args) {
			console.error(args);
		},
	});

	return (
		<form action={executeFormAction} className='border border-gray-100 rounded-lg overflow-hidden'>
			<input type='hidden' name='productId' value={id} />
			<div className='flex justify-between items-center p-4 bg-neutral-50 border-b border-gray-100'>
				<span className='flex-grow flex flex-col'>
					<span className='text-sm font-medium text-gray-900'>Delete Product</span>
					<span className='text-sm text-gray-500 pr-4'>Delete all data associated with this product.</span>
				</span>
			</div>
			<div className='p-4 space-y-4'>
				<div className='space-y-1'>
					<Label htmlFor='confirmation' className='text-right'>
						To confirm, type &quot;delete {name}&quot; below:
					</Label>
					<Input
						required
						id='confirmation'
						name='confirmation'
						pattern={`\s*delete ${name}\s*`}
						placeholder={`delete ${name}`}
					/>
					<span className='text-xs text-gray-500'>This action is not reversible. Please be certain.</span>
				</div>
			</div>
			<div className='px-4 gap-2 bg-neutral-50 border-t border-gray-100 py-2 flex justify-end w-full'>
				<Button variant='destructive'>{isPending ? 'Deleting...' : 'Delete Product'}</Button>
			</div>
		</form>
	);
}
