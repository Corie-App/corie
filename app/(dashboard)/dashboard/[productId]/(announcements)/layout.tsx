import AnnouncementsList from './ui/announcements-list';

export default function AnnouncementsLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { productId: string };
}) {
	return (
		<div className='grow flex bg-gray-50'>
			<AnnouncementsList productId={params.productId} />
			{children}
		</div>
	);
}
