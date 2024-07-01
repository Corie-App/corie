'use client';

import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';

export default function Navigation({ productId }: { productId: string }) {
	const router = useRouter();
	const segments = useSelectedLayoutSegments();

	const handleChange = (value: string) => {
		if (value === 'announcements') router.push(`/dashboard/${productId}`);
		else router.push(`/dashboard/${productId}/settings`);
	};

	return (
		<Tabs
			className='py-4'
			onValueChange={handleChange}
			defaultValue={segments.at(-1) === 'settings' ? 'settings' : 'announcements'}>
			<TabsList>
				<TabsTrigger value='announcements'>Announcements</TabsTrigger>
				<TabsTrigger value='settings'>Settings</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
