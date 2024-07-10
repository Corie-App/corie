'use client';

import { RulesKvResponse } from '@/lib/types';
import { Button } from '@/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/ui/sheet';

interface Props {
	rules: (RulesKvResponse['paths'] & { ts: number })[];
}

export default function VersionHistorySheet({ rules }: Props) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button type='button' variant='outline'>
					Version History
				</Button>
			</SheetTrigger>
			<SheetContent className='pb-0'>
				<SheetHeader>
					<SheetTitle>Version History</SheetTitle>
					<SheetDescription>View and select the version you want to restore.</SheetDescription>
				</SheetHeader>
				<div className='grow pb-4 space-y-4 overflow-y-auto scrollbar-hide'>
					{rules.map((rule) => {
						const hasAllowlist = rule.allowlist.length > 0;
						const hasBlocklist = rule.blocklist.length > 0;

						return (
							<div key={rule.ts} className='space-y-4 rounded-md border border-neutral-200 px-4 py-2'>
								<div className='space-y-1'>
									Allowlist
									<p className='text-xs text-muted-foreground'>
										{hasAllowlist ? rule.allowlist.join(', ') : 'No paths'}
									</p>
								</div>
								<div className='space-y-1'>
									Blocklist
									<p className='text-xs text-muted-foreground'>
										{hasBlocklist ? rule.blocklist.join(', ') : 'No paths'}
									</p>
								</div>
								<div className='flex items-center gap-2 justify-between'>
									<p className='text-xs text-muted-foreground'>
										{new Date(rule.ts).toLocaleString()}
									</p>
									<Button variant='secondary' className='text-xs'>
										Restore
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
}
