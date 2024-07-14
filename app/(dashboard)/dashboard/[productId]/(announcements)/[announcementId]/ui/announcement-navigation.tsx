'use client';

import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';

interface Props {
	productId: string;
	announcementId: string;
}

export default function AnnouncementNavigation({ productId, announcementId }: Props) {
	const router = useRouter();
	const segments = useSelectedLayoutSegments();
	const filteredSegments = segments.filter((s) => !/[()]/.test(s));

	const handleChange = (value: string) => {
		if (value === 'details') router.push(`/dashboard/${productId}/${announcementId}`);
		else {
			router.push(`/dashboard/${productId}/${announcementId}/${value}`);
		}
	};

	return (
		<Tabs
			className='py-3 bg-white flex justify-center sticky top-0 z-10'
			onValueChange={handleChange}
			defaultValue={filteredSegments.length === 0 ? 'details' : filteredSegments[0]}>
			<TabsList>
				<TabsTrigger value='details'>Details</TabsTrigger>
				<TabsTrigger value='theme'>Theme</TabsTrigger>
				<TabsTrigger value='rules'>Rules</TabsTrigger>
				<TabsTrigger value='analytics'>Analytics</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
