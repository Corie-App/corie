'use client';

import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { useAnnouncementConfig } from '../../ui/provider';
import type { ButtonStyle } from '@/lib/types';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { updateAnnouncemenThemetAction } from '../actions';

interface Props {
	productId: string;
	announcementId: string;
}

export default function ThemeForm({ productId, announcementId }: Props) {
	const { buttonStyle, setButtonStyle } = useAnnouncementConfig();

	const { executeFormAction, isPending } = useServerAction(updateAnnouncemenThemetAction, {
		onSuccess() {
			toast.success('Changes saved successfully');
		},
	});

	return (
		<form action={executeFormAction} className='bg-white p-4 flex-1'>
			<input type='hidden' name='productId' value={productId} />
			<input type='hidden' name='announcementId' value={announcementId} />
			<div className='space-y-4 py-4 max-w-lg mx-auto'>
				<div className='space-y-2'>
					<p className='text-sm font-medium leading-none'>Button Style</p>
					<RadioGroup
						name='buttonStyle'
						defaultValue={buttonStyle}
						className='grid grid-cols-3 gap-4'
						onValueChange={(val) => setButtonStyle(val as ButtonStyle)}>
						<div>
							<RadioGroupItem value='flat' id='flat' className='peer sr-only' />
							<Label
								htmlFor='flat'
								className='flex gap-2 items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
								<div className='flex h-6 w-6 min-w-6 rounded-none bg-gradient-to-r from-primary to-transparent' />
								Flat
							</Label>
						</div>
						<div>
							<RadioGroupItem value='curved' id='curved' className='peer sr-only' />
							<Label
								htmlFor='curved'
								className='flex gap-2 items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
								<div className='flex h-6 w-6 min-w-6 rounded-tl rounded-bl bg-gradient-to-r from-primary to-transparent' />
								Curved
							</Label>
						</div>
						<div>
							<RadioGroupItem value='pill' id='pill' className='peer sr-only' />
							<Label
								htmlFor='pill'
								className='flex gap-2 items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
								<div className='flex h-6 w-6 min-w-6 rounded-tl-full rounded-bl-full bg-gradient-to-r from-primary to-transparent' />
								Pill
							</Label>
						</div>
					</RadioGroup>
				</div>
				<Button>{isPending ? 'Saving...' : 'Save Changes'}</Button>
			</div>
		</form>
	);
}
