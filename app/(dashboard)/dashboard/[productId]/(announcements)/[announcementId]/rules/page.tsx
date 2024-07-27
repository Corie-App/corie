import { Accordion } from '@/ui/accordion';
import GeolocationRules from './ui/geolocation-rules';
import { kv } from '@vercel/kv';
import { RulesKvResponse } from '@/lib/types';
import PathRules from './ui/path-rules';
import PathVersionHistory from './ui/path-version-history';
import SchedulingRules from './ui/scheduling-rules';
import DeviceRules from './ui/device-rules';

export default async function AnnouncementRulesPage({ params }: { params: { announcementId: string } }) {
	const geoLocationRule = await kv.hget<RulesKvResponse['geolocation']>(
		`rules:${params.announcementId}`,
		'geolocation'
	);
	const pathsRule = await kv.hget<RulesKvResponse['paths']>(`rules:${params.announcementId}`, 'paths');
	const scheduleRule = await kv.hget<RulesKvResponse['schedule']>(`rules:${params.announcementId}`, 'schedule');
	const devicesRule = await kv.hget<RulesKvResponse['devices']>(`rules:${params.announcementId}`, 'devices');

	return (
		<div className='h-full mx-auto max-w-2xl w-full py-6'>
			<Accordion type='multiple' className='space-y-4 pb-6'>
				<GeolocationRules initialCountries={geoLocationRule?.countries} />
				<PathRules rules={pathsRule}>
					<PathVersionHistory announcementId={params.announcementId} />
				</PathRules>
				<SchedulingRules rules={scheduleRule} />
				<DeviceRules initialDevices={devicesRule?.targetDevices} />
			</Accordion>
		</div>
	);
}
