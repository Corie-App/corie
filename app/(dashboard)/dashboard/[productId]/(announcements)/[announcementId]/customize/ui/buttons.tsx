'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { MousePointerClick } from 'lucide-react';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { useAnnouncementConfig } from './provider';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { Input } from '@/ui/input';
import { Switch } from '@/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import { updateButtonsAction } from '../actions';

export default function Details({ productId, announcementId }: { productId: string; announcementId: string }) {
	const {
		ctaButtonText,
		ctaButtonUrl,
		dismissButtonText,
		showDismissButton,
		setShowDismissButton,
		setCtaButtonText,
		setCtaButtonUrl,
		setDismissButtonText,
	} = useAnnouncementConfig();

	const { executeFormAction, isPending } = useServerAction(updateButtonsAction, {
		onSuccess() {
			toast.success('Changes saved successfully');
		},
	});

	return (
		<AccordionItem value='buttons' className='border-b-0 px-3'>
			<AccordionTrigger className='hover:no-underline'>
				<div className='flex items-center gap-1.5'>
					<MousePointerClick size={16} className='text-muted-foreground' />
					<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
					Buttons
				</div>
			</AccordionTrigger>
			<AccordionContent className='space-y-2'>
				<form action={executeFormAction} className='bg-white p-4 flex-1'>
					<input type='hidden' name='productId' value={productId} />
					<input type='hidden' name='announcementId' value={announcementId} />
					<div className='space-y-4 py-4 max-w-lg mx-auto'>
						<div className='space-y-1'>
							<div className='flex justify-between items-center gap-4'>
								<Label htmlFor='name' className='text-right'>
									Dismiss Button Text
								</Label>
								<Tooltip delayDuration={100}>
									<TooltipTrigger asChild>
										<span>
											<Switch
												name='showDismissButton'
												checked={showDismissButton}
												onCheckedChange={(checked) => setShowDismissButton(checked)}
											/>
										</span>
									</TooltipTrigger>
									<TooltipContent side='top' align='end' sideOffset={8}>
										<p>{showDismissButton ? 'Hide ' : 'Show '}the dismiss button</p>
									</TooltipContent>
								</Tooltip>
							</div>
							<Input
								id='dismissButtonText'
								name='dismissButtonText'
								value={dismissButtonText}
								required={showDismissButton}
								placeholder="Don't show again"
								onChange={(e) => setDismissButtonText(e.target.value)}
							/>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='name' className='text-right'>
								Call to Action Button Text
							</Label>
							<Input
								required
								id='ctaButtonText'
								name='ctaButtonText'
								value={ctaButtonText}
								placeholder='Learn More'
								onChange={(e) => setCtaButtonText(e.target.value)}
							/>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='ctaButtonUrl' className='text-right'>
								Call to Action Button Url
							</Label>
							<Input
								required
								type='url'
								id='ctaButtonUrl'
								name='ctaButtonUrl'
								value={ctaButtonUrl}
								onChange={(e) => setCtaButtonUrl(e.target.value)}
								placeholder='https://www.example.com/blog/new-feature'
							/>
							<span className='text-xs text-gray-500'>The button will link to this url</span>
						</div>
						<div className='flex items-center gap-4'>
							<Button>{isPending ? 'Saving...' : 'Save Changes'}</Button>
						</div>
					</div>
				</form>
			</AccordionContent>
		</AccordionItem>
	);
}
