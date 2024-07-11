'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Button } from '@/ui/button';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useServerAction } from 'zsa-react';
import { savePathRulesAction } from '../actions';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { RulesKvResponse } from '@/lib/types';
import { Info } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';

interface Props extends PropsWithChildren {
	rules: RulesKvResponse['paths'] | null;
}

export default function PathRules({ rules, children }: Props) {
	const params = useParams();
	const [allowlist, setAllowlist] = useState(rules?.allowlist.join(', '));
	const [blocklist, setBlocklist] = useState(rules?.blocklist.join(', '));

	const { executeFormAction, isPending } = useServerAction(savePathRulesAction, {
		onSuccess() {
			toast.success('Changes saved successfully');
		},
		onError(args) {
			console.error(args);
		},
	});

	const handleReset = () => {
		setAllowlist(rules?.allowlist.join(', '));
		setBlocklist(rules?.blocklist.join(', '));
	};

	// update the inputs when page is revalidated
	useEffect(() => {
		if (rules) {
			setAllowlist(rules.allowlist.join(', '));
			setBlocklist(rules.blocklist.join(', '));
		}
	}, [rules]);

	return (
		<AccordionItem value='paths' className='border-b-0 bg-white ring-1 ring-inset ring-gray-200 rounded-lg'>
			<AccordionTrigger className='hover:no-underline px-3'>
				<div className='flex items-center gap-1.5'>
					<span className='text-sm font-medium'>🔗</span>
					<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
					Paths
				</div>
			</AccordionTrigger>
			<AccordionContent className='space-y-2 px-3'>
				<form action={executeFormAction}>
					<input type='hidden' name='productId' value={params.productId as string} />
					<input type='hidden' name='announcementId' value={params.announcementId as string} />
					<div className='space-y-4'>
						<div className='space-y-1'>
							<div className='flex items-center gap-1.5'>
								<Label htmlFor='blocklist' className='text-right'>
									Blocklist
								</Label>
								<Tooltip delayDuration={100}>
									<TooltipTrigger asChild>
										<Info size={16} className='text-gray-500' />
									</TooltipTrigger>
									<TooltipContent className='max-w-xs'>
										<p>
											The blocklist takes precedence over the allowlist. For example,{' '}
											<span className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
												/blog/drafts/my-blog
											</span>{' '}
											will be blocked with the following rules:
										</p>
										<div className='mt-4 flex items-center justify-between'>
											<span className='text-muted-foreground text-xs'>Blocklist</span>
											<span className='text-muted-foreground text-xs'>Allowlist</span>
										</div>
										<div className='flex items-center justify-between'>
											<span className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
												/blog/drafts/*
											</span>
											<span className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
												/blog/*
											</span>
										</div>
									</TooltipContent>
								</Tooltip>
							</div>
							<Input
								id='blocklist'
								name='blocklist'
								value={blocklist}
								showClearButton={blocklist !== ''}
								onChange={(e) => setBlocklist(e.target.value)}
								placeholder='/blog/drafts/*, /products/archived/*'
							/>
							<span className='text-xs text-gray-500'>
								This announcement won&apos;t be shown on these paths
							</span>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='allowlist' className='text-right'>
								Allowlist
							</Label>
							<Input
								id='allowlist'
								name='allowlist'
								value={allowlist}
								placeholder='/blog/*, /contact'
								showClearButton={allowlist !== ''}
								onChange={(e) => setAllowlist(e.target.value)}
							/>
							<span className='text-xs text-gray-500'>
								This announcement will be shown on these paths
							</span>
						</div>
					</div>
					<div className='flex items-center justify-between gap-2 mt-4'>
						<div className='flex items-center gap-2'>
							<Button disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
							<Button type='button' onClick={handleReset} variant='secondary'>
								Reset
							</Button>
						</div>
						{children}
					</div>
				</form>
			</AccordionContent>
		</AccordionItem>
	);
}
