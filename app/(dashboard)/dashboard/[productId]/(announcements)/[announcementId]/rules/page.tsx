import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import GeolocationRules from './ui/geolocation-rules';
import { kv } from '@vercel/kv';
import { RulesKvResponse } from '@/lib/types';
import PathRules from './ui/path-rules';
import PathVersionHistory from './ui/path-version-history';
import SchedulingRules from './ui/scheduling-rules';

export default async function AnnouncementRulesPage({ params }: { params: { announcementId: string } }) {
	const geoLocationRule = await kv.hget<RulesKvResponse['geolocation']>(
		`rules:${params.announcementId}`,
		'geolocation'
	);
	const pathsRule = await kv.hget<RulesKvResponse['paths']>(`rules:${params.announcementId}`, 'paths');
	const scheduleRule = await kv.hget<RulesKvResponse['schedule']>(`rules:${params.announcementId}`, 'schedule');

	return (
		<div className='h-full mx-auto max-w-2xl w-full py-6'>
			<Accordion type='multiple' className='space-y-4 pb-6'>
				<GeolocationRules initialCountries={geoLocationRule?.countries} />
				<PathRules rules={pathsRule}>
					<PathVersionHistory announcementId={params.announcementId} />
				</PathRules>
				<SchedulingRules rules={scheduleRule} />
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
