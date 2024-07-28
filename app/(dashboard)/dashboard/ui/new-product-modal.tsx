'use client';

import { Button } from '@/ui/button';
import {
	Dialog,
	DialogClose,
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
import { UrlInput } from '@/ui/url-input';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props extends PropsWithChildren {
	show?: boolean;
	showTrigger?: boolean;
	onClose?: () => void;
}

export default function NewProductModal({ show = false, children, showTrigger = true, onClose }: Props) {
	const [open, setOpen] = useState(show);
	const closeRef = useRef<HTMLButtonElement>(null);

	const { executeFormAction, isPending } = useServerAction(createProductAction, {
		onSuccess() {
			closeRef.current?.click();
			toast.success('Product created successfully');
		},
		onError(args) {
			console.error(args);
		},
	});

	useEffect(() => {
		setOpen(show);
	}, [show]);

	useEffect(() => {
		if (!open) onClose?.();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{children}
			{showTrigger && (
				<DialogTrigger asChild>
					<Button>
						<Plus size={16} className='mr-2' />
						Create Product
					</Button>
				</DialogTrigger>
			)}
			<DialogContent className='sm:max-w-[425px]'>
				<DialogClose ref={closeRef} className='hidden' />
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
							<Input required id='name' name='name' placeholder='My first product' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='domain' className='text-right'>
								Your domain
							</Label>
							<UrlInput required id='domain' name='domain' placeholder='my-product.com' />
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
