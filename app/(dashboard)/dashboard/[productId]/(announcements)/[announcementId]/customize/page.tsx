import { Accordion } from '@/ui/accordion';
import Details from './ui/details';
import Theme from './ui/theme';
import Buttons from './ui/buttons';

export default function CustomizePage({ params }: { params: { announcementId: string; productId: string } }) {
	return (
		<div className='bg-white flex-1 m-4 rounded-lg overflow-y-auto'>
			<Accordion type='multiple' className='pb-6 divide-y divide-gray-100'>
				<Details productId={params.productId} announcementId={params.announcementId} />
				<Theme productId={params.productId} announcementId={params.announcementId} />
				<Buttons productId={params.productId} announcementId={params.announcementId} />
			</Accordion>
		</div>
	);
}
