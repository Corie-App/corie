import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import GeolocationRules from './ui/geolocation-rules';
import { kv } from '@vercel/kv';
import { GeolocationKvResponse } from '@/lib/types';

export default async function AnnouncementRulesPage({ params }: { params: { announcementId: string } }) {
	const geoLocationRule = await kv.hget<GeolocationKvResponse>(`rules:${params.announcementId}`, 'geolocation');

	return (
		<div className='h-full mx-auto max-w-2xl w-full py-6'>
			<Accordion type='multiple' className='space-y-4'>
				<GeolocationRules initialCountries={geoLocationRule?.countries} />
				<AccordionItem
					value='paths'
					className='border-b-0 bg-white ring-1 ring-inset ring-gray-200 rounded-lg px-3'>
					<AccordionTrigger className='hover:no-underline'>
						<div className='flex items-center gap-1.5'>
							<span className='text-sm font-medium'>🔗</span>
							<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
							Paths
						</div>
					</AccordionTrigger>
					<AccordionContent>Add path rules here.</AccordionContent>
				</AccordionItem>
				<AccordionItem
					value='schedule'
					className='border-b-0 bg-white ring-1 ring-inset ring-gray-200 rounded-lg px-3'>
					<AccordionTrigger className='hover:no-underline'>
						<div className='flex items-center gap-1.5'>
							<span className='text-sm font-medium'>⏳</span>
							<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
							Schedule
						</div>
					</AccordionTrigger>
					<AccordionContent>Add path rules here.</AccordionContent>
				</AccordionItem>
				<AccordionItem
					value='device'
					className='border-b-0 bg-white ring-1 ring-inset ring-gray-200 rounded-lg px-3'>
					<AccordionTrigger className='hover:no-underline'>
						<div className='flex items-center gap-1.5'>
							<span className='text-sm font-medium'>💻</span>
							<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
							Device
						</div>
					</AccordionTrigger>
					<AccordionContent>Add path rules here.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
