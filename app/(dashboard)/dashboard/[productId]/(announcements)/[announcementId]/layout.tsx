import AnnouncementNavigation from './ui/announcement-navigation';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
	params: { productId: string; announcementId: string };
}

export default function AnnouncementLayoutPage({ children, params }: Props) {
	return (
		<div className='w-full h-full flex flex-col overflow-y-auto'>
			<AnnouncementNavigation productId={params.productId} announcementId={params.announcementId} />
			{children}
		</div>
	);
}
