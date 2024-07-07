'use client';

import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { useAnnouncementConfig } from '../../ui/provider';
import type { ButtonStyle, Layout } from '@/lib/types';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { generateThemeAction, updateAnnouncemenThemeAction } from '../actions';
import { ColorPicker } from '@/ui/color-picker';
import { Image as ImageIcon, Palette } from 'lucide-react';
import { Input } from '@/ui/input';

interface Props {
	productId: string;
	announcementId: string;
}

export default function ThemeForm({ productId, announcementId }: Props) {
	const { layout, imageUrl, setLayout, buttonStyle, setImageUrl, setButtonStyle, primaryColor, setPrimaryColor } =
		useAnnouncementConfig();

	const generateTheme = useServerAction(generateThemeAction, {
		onSuccess({ data }) {
			toast.success('Theme updated successfully');
			setPrimaryColor(data.primaryColor);
			setButtonStyle(data.buttonStyle);
			setLayout(data.layout);
			const buttonStylEl = document.querySelector<HTMLButtonElement>(`#${data.buttonStyle}`);
			const layoutEl = document.querySelector<HTMLButtonElement>(`#${data.layout}`);
			if (buttonStylEl) buttonStylEl.click();
			if (layoutEl) layoutEl.click();
		},
		onError({ err }) {
			toast.error(err.message);
		},
	});

	const { executeFormAction, isPending } = useServerAction(updateAnnouncemenThemeAction, {
		onSuccess() {
			toast.success('Changes saved successfully');
		},
	});

	return (
		<form action={executeFormAction} className='bg-white p-4 flex-1'>
			<input type='hidden' name='productId' value={productId} />
			<input type='hidden' name='announcementId' value={announcementId} />
			<div className='space-y-4 py-4 max-w-lg mx-auto'>
				<div className='flex items-center justify-between gap-4'>
					<Label htmlFor='primaryColor' className='text-right'>
						Primary Color
					</Label>
					<ColorPicker formName='primaryColor' value={primaryColor} onChange={setPrimaryColor} />
				</div>
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
				<div>
					<p className='text-sm font-medium leading-none'>Layout</p>
					<RadioGroup
						name='layout'
						defaultValue={layout}
						className='grid grid-cols-3 gap-4 items-center'
						onValueChange={(val) => setLayout(val as Layout)}>
						<div>
							<RadioGroupItem value='default' id='default' className='peer sr-only' />
							<Label
								htmlFor='default'
								className='relative w-full h-max bg-white flex gap-2 items-center rounded-md border-2 border-muted bg-popover p-3 transition-all hover:border-primary/60 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
								<div className='space-y-1 w-full'>
									<div className='bg-gray-300 rounded w-full h-3' />
									<div className='flex gap-1 items-center'>
										<div className='bg-gray-200 rounded w-full h-3' />
										<div className='bg-gray-200 rounded w-full h-3' />
										<div className='bg-gray-200 rounded w-full h-3' />
									</div>
								</div>
							</Label>
						</div>
						<div>
							<RadioGroupItem value='image-left' id='image-left' className='peer sr-only' />
							<Label
								htmlFor='image-left'
								className='relative w-full h-max bg-white flex gap-1 items-center rounded-md border-2 border-muted bg-popover p-3 transition-all hover:border-primary/60 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
								<div className='h-7 min-w-7 flex justify-center items-center rounded bg-gray-100 text-gray-700'>
									<ImageIcon size={16} />
								</div>
								<div className='space-y-1 w-full'>
									<div className='bg-gray-300 rounded w-full h-3' />
									<div className='flex gap-1 items-center'>
										<div className='bg-gray-200 rounded w-full h-3' />
										<div className='bg-gray-200 rounded w-full h-3' />
										<div className='bg-gray-200 rounded w-full h-3' />
									</div>
								</div>
							</Label>
						</div>
						<div>
							<RadioGroupItem value='image-top' id='image-top' className='peer sr-only' />
							<Label
								htmlFor='image-top'
								className='relative w-full h-max bg-white flex flex-col gap-1 items-center rounded-md border-2 border-muted bg-popover p-3 transition-all hover:border-primary/60 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
								<div className='h-7 w-full flex justify-center items-center rounded bg-gray-100 text-gray-700'>
									<ImageIcon size={16} />
								</div>
								<div className='space-y-1 w-full'>
									<div className='bg-gray-300 rounded w-full h-3' />
									<div className='flex gap-1 items-center'>
										<div className='bg-gray-200 rounded w-full h-3' />
										<div className='bg-gray-200 rounded w-full h-3' />
										<div className='bg-gray-200 rounded w-full h-3' />
									</div>
								</div>
							</Label>
						</div>
					</RadioGroup>
				</div>
				{layout !== 'default' && (
					<div className='space-y-1'>
						<Label htmlFor='imageUrl' className='text-right'>
							Image URL
						</Label>
						<div className='relative'>
							<Input
								type='url'
								required
								id='imageUrl'
								name='imageUrl'
								placeholder={imageUrl ?? 'https://static.com/image.png'}
								defaultValue={imageUrl ?? undefined}
								onChange={(e) => setImageUrl(e.target.value)}
							/>
						</div>
					</div>
				)}
				<div className='flex items-center gap-4'>
					<Button variant='secondary' type='button' onClick={() => generateTheme.execute({ productId })}>
						<Palette size={16} className='mr-1.5' />
						{generateTheme.isPending ? 'Generating...' : 'Generate theme from your domain'}
					</Button>
					<Button>{isPending ? 'Saving...' : 'Save Changes'}</Button>
				</div>
			</div>
		</form>
	);
}
