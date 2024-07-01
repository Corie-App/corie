import NewAnnouncementModal from './(announcements)/ui/new-announcement-modal';
import Navigation from './ui/navigation';

export default async function ProductPageLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { productId: string };
}) {
	return (
		<>
			<div className='border-b border-gray-100 flex justify-between items-center px-4'>
				<Navigation productId={params.productId} />
				<NewAnnouncementModal productId={params.productId} />
			</div>
			{children}
		</>
	);
}
