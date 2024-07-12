'use client';

import { RulesKvResponse } from '@/lib/types';
import { Button } from '@/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/ui/sheet';
import { toast } from 'sonner';
import { useRef } from 'react';
import VersionCard from './version-card';

interface Props {
	rules: (RulesKvResponse['paths'] & { ts: number })[];
}

export default function VersionHistorySheet({ rules }: Props) {
	const closeRef = useRef<HTMLButtonElement>(null);

	const onSuccess = () => {
		closeRef.current?.click();
		toast.success('Paths have been restored successfully');
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button type='button' variant='outline'>
					Version History
				</Button>
			</SheetTrigger>
			<SheetClose ref={closeRef} className='hidden' />
			<SheetContent className='pb-0'>
				<SheetHeader>
					<SheetTitle>Version History</SheetTitle>
					<SheetDescription>View and select the version you want to restore.</SheetDescription>
				</SheetHeader>
				<div className='grow pb-4 space-y-4 overflow-y-auto scrollbar-hide'>
					{rules.map((rule) => {
						return <VersionCard key={rule.ts} rule={rule} onSuccess={onSuccess} />;
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
}
