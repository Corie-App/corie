import DetailsForm from './ui/details-form';

interface Props {
	params: { productId: string; announcementId: string };
}

export default function AnnouncementPage({ params }: Props) {
	return <DetailsForm productId={params.productId} announcementId={params.announcementId} />;
}
