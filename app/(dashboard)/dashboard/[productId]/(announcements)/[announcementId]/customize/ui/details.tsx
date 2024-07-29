'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { TextIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { useAnnouncementConfig } from './provider';
import { updateDetailsAction } from '../actions';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';

export default function Details({ productId, announcementId }: { productId: string; announcementId: string }) {
	const { title, setTitle, setDescription, description } = useAnnouncementConfig();

	const { executeFormAction, isPending } = useServerAction(updateDetailsAction, {
		onSuccess() {
			toast.success('Changes saved successfully');
		},
	});

	return (
		<AccordionItem value='details' className='border-b-0 px-3'>
			<AccordionTrigger className='hover:no-underline'>
				<div className='flex items-center gap-1.5'>
					<TextIcon size={16} className='text-muted-foreground' />
					<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
					Details
				</div>
			</AccordionTrigger>
			<AccordionContent className='space-y-2'>
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
								placeholder={description}
								defaultValue={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<span className='text-xs text-gray-500'>Characters: {description.length}/175</span>
						</div>
						<Button disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
					</div>
				</form>
			</AccordionContent>
		</AccordionItem>
	);
}
