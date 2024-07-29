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
import { Textarea } from '@/ui/textarea';
import { toast } from 'sonner';
import { createAnnouncementAction } from '../actions';
import { useRef, useState } from 'react';

export default function NewAnnouncementModal({ productId }: { productId: string }) {
	const [desc, setDesc] = useState('');
	const [title, setTitle] = useState('');
	const closeRef = useRef<HTMLButtonElement>(null);
	const { executeFormAction, isPending, data } = useServerAction(createAnnouncementAction, {
		onSuccess() {
			closeRef.current?.click();
			toast.success('Announcement created successfully');
		},
		onError(args) {
			console.error(args);
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus size={16} className='mr-2' />
					Create Announcement
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogClose ref={closeRef} className='hidden' />
				<form action={executeFormAction}>
					<input type='hidden' name='productId' value={productId} />
					<DialogHeader>
						<DialogTitle>Create an announcement</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<div className='space-y-4 py-4'>
						<div className='space-y-1'>
							<Label htmlFor='title' className='text-right'>
								Title
							</Label>
							<div className='relative'>
								<Input
									required
									id='title'
									name='title'
									maxLength={75}
									className='pr-16'
									placeholder='My first announcement'
									onChange={(e) => setTitle(e.target.value)}
								/>
								<span className='absolute right-0 top-0 bottom-0 flex items-center px-3 text-sm text-muted-foreground'>
									{title.length}/75
								</span>
							</div>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='description' className='text-right'>
								Description
							</Label>
							<Textarea
								required
								maxLength={175}
								id='description'
								name='description'
								className='scroll-p-2'
								placeholder='Enter a description'
								onChange={(e) => setDesc(e.target.value)}
							/>
							<span className='text-xs text-gray-500'>Characters: {desc.length}/175</span>
						</div>
					</div>
					<DialogFooter>
						<Button>{isPending ? 'Creating...' : 'Create Announcement'}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
