'use client';

import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import { useAnnouncementConfig } from '../../ui/provider';
import { useServerAction } from 'zsa-react';
import { updateAnnouncementAction } from '../actions';
import { toast } from 'sonner';

interface Props {
	title: string;
	description: string;
	productId: string;
	announcementId: string;
}

export default function DetailsForm({ title, description, productId, announcementId }: Props) {
	const { title: currTitle, setTitle, setDescription, description: currentDesc } = useAnnouncementConfig();

	const { executeFormAction, isPending } = useServerAction(updateAnnouncementAction, {
		onSuccess() {
			toast.success('Changes saved successfully');
		},
	});

	return (
		<form action={executeFormAction} className='bg-white p-4 flex-1'>
			<input type='hidden' name='productId' value={productId} />
			<input type='hidden' name='announcementId' value={announcementId} />
			<div className='space-y-4 py-4 max-w-lg mx-auto'>
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
							placeholder={title}
							defaultValue={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<span className='absolute right-0 top-0 bottom-0 flex items-center px-3 text-sm text-muted-foreground'>
							{currTitle.length}/75
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
						placeholder={description}
						defaultValue={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<span className='text-xs text-gray-500'>Characters: {currentDesc.length}/175</span>
				</div>
				<Button>{isPending ? 'Saving...' : 'Save Changes'}</Button>
			</div>
		</form>
	);
}
