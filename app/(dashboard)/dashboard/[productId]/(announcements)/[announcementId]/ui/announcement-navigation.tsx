'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';

interface Props {
	productId: string;
	announcementId: string;
}

export default function AnnouncementNavigation({ productId, announcementId }: Props) {
	const tabRef = useRef<HTMLButtonElement>(null);
	const segments = useSelectedLayoutSegments();
	const filteredSegments = useMemo(() => segments.filter((s) => !/[()]/.test(s)), [segments]);

	useEffect(() => {
		if (segments[0] === 'customize') tabRef.current?.click();
	}, [segments]);

	return (
		<div
			className='py-3 bg-white flex justify-center sticky top-0 z-10'
			defaultValue={filteredSegments.length === 0 ? 'customize' : filteredSegments[0]}>
			<div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'>
				<Link
					className={cn(
						'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
						filteredSegments[0] === 'customize' && 'bg-background text-foreground shadow-sm'
					)}
					href={`/dashboard/${productId}/${announcementId}/customize`}>
					Customize
				</Link>
				<Link
					className={cn(
						'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
						filteredSegments[0] === 'rules' && 'bg-background text-foreground shadow-sm'
					)}
					href={`/dashboard/${productId}/${announcementId}/rules`}>
					Rules
				</Link>
				<Link
					className={cn(
						'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
						filteredSegments[0] === 'analytics' && 'bg-background text-foreground shadow-sm'
					)}
					href={`/dashboard/${productId}/${announcementId}/analytics`}>
					Analytics
				</Link>
			</div>
		</div>
	);
}
