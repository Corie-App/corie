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
import { Textarea } from '@/ui/textarea';
import { createAnnouncementAction } from '../actions';
import { toast } from 'sonner';

export default function NewAnnouncementModal({ productId }: { productId: string }) {
	const { executeFormAction, isPending, data } = useServerAction(createAnnouncementAction, {
		onSuccess() {
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
							<Input required id='title' name='title' placeholder='My first announcement' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='description' className='text-right'>
								Description
							</Label>
							<Textarea required id='description' name='description' placeholder='Enter a description' />
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
