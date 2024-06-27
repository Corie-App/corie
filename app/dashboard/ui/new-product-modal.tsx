'use client';

import { Button } from '@/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Plus } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { createProductAction } from '../actions';

export default function NewProductModal() {
	const { executeFormAction, isPending } = useServerAction(createProductAction, {
		onError(args) {
			console.error(args);
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus size={16} className='mr-2' />
					Create Product
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<form action={executeFormAction}>
					<DialogHeader>
						<DialogTitle>Create a product</DialogTitle>
						<DialogDescription>Products are used to manage your announcements</DialogDescription>
					</DialogHeader>
					<div className='space-y-4 py-4'>
						<div className='space-y-1'>
							<Label htmlFor='name' className='text-right'>
								Product Name
							</Label>
							<Input required name='name' placeholder='My first product' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='name' className='text-right'>
								Your domain
							</Label>
							<Input required name='domain' type='url' placeholder='https://my-product.com' />
							<span className='text-xs text-gray-500'>
								Announcements will be displayed on this domain
							</span>
						</div>
					</div>
					<DialogFooter>
						<Button>{isPending ? 'Creating...' : 'Create Product'}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
