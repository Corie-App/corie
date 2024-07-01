export default function AnnouncementPage({ params }: { params: { productId: string; announcementId: string } }) {
	return (
		<div className=''>
			<h1>Announcement {params.announcementId}</h1>
		</div>
	);
}
