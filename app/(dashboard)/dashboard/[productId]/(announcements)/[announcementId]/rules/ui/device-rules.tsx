'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { useServerAction } from 'zsa-react';
import { saveDeviceRulesAction } from '../actions';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { RulesKvResponse } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Laptop, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/ui/button';

type DeviceType = 'Mobile' | 'Tablet' | 'Desktop';

type Devices = Record<
	DeviceType,
	{
		icon: JSX.Element;
		devices: Array<{ label: string; value: string }>;
	}
>;

const devices: Devices = {
	Mobile: {
		icon: <Smartphone size={16} />,
		devices: [
			{ label: 'All', value: 'all_mobile' },
			{ label: 'iOS', value: 'mobile_ios' },
			{ label: 'Android', value: 'mobile_android' },
			{ label: 'Other', value: 'mobile_other' },
		],
	},
	Tablet: {
		icon: <Tablet size={16} />,
		devices: [
			{ label: 'All', value: 'all_tablet' },
			{ label: 'iPad', value: 'tablet_ipad' },
			{ label: 'Android', value: 'tablet_android' },
			{ label: 'Other', value: 'tablet_other' },
		],
	},
	Desktop: {
		icon: <Laptop size={16} />,
		devices: [
			{ label: 'All', value: 'all_desktop' },
			{ label: 'Windows', value: 'desktop_windows' },
			{ label: 'macOS', value: 'desktop_macos' },
			{ label: 'Linux', value: 'desktop_linux' },
			{ label: 'Other', value: 'desktop_other' },
		],
	},
};

interface Props {
	initialDevices: RulesKvResponse['devices']['targetDevices'] | undefined;
}

export default function DeviceRules({ initialDevices }: Props) {
	const params = useParams();
	const [selectedDevices, setSelectedDevices] = useState<string[]>(initialDevices ?? []);

	const { execute, isPending } = useServerAction(saveDeviceRulesAction, {
		onSuccess(data) {
			toast.success('Changes saved successfully');
		},
		onError(args) {
			console.error(args);
		},
	});

	const handleSave = () => {
		execute({
			devices: selectedDevices,
			productId: params.productId as string,
			announcementId: params.announcementId as string,
		});
	};

	const handleSelect = (value: string) => {
		if (selectedDevices.includes(value)) {
			setSelectedDevices(selectedDevices.filter((device) => device !== value));
			return;
		}

		switch (value) {
			case 'all_mobile':
				setSelectedDevices(['mobile_ios', 'mobile_android', 'mobile_other']);
				break;
			case 'all_tablet':
				setSelectedDevices(['tablet_ipad', 'tablet_android', 'tablet_other']);
				break;
			case 'all_desktop':
				setSelectedDevices(['desktop_windows', 'desktop_macos', 'desktop_linux', 'desktop_other']);
				break;
			default:
				setSelectedDevices((prev) => [...prev, value]);
		}
	};

	return (
		<AccordionItem value='device' className='border-b-0 bg-white ring-1 ring-inset ring-gray-200 rounded-lg px-3'>
			<AccordionTrigger className='hover:no-underline'>
				<div className='flex items-center gap-1.5'>
					<span className='text-sm font-medium'>💻</span>
					<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
					Device
				</div>
			</AccordionTrigger>
			<AccordionContent className='space-y-4'>
				<p className='text-muted-foreground'>Specify which devices this announcement should be displayed on</p>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{Object.keys(devices).map((deviceType) => (
						<div key={deviceType} className='space-y-4'>
							<p className='text-foreground font-semibold inline-flex items-center gap-1'>
								{devices[deviceType as keyof typeof devices].icon}
								{deviceType}
							</p>
							<div className='space-y-2'>
								{devices[deviceType as keyof typeof devices].devices.map((device) => (
									<button
										key={device.value}
										type='button'
										onClick={() => handleSelect(device.value)}
										className={cn(
											'flex items-center rounded-full max-w-max transition-all duration-300 ease-in-out py-2 px-3 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
											selectedDevices.includes(device.value)
												? 'bg-primary text-white'
												: 'bg-gray-50 hover:bg-gray-100 text-foreground'
										)}>
										{device.label}
									</button>
								))}
							</div>
						</div>
					))}
				</div>
				<div className='flex items-center gap-2'>
					<Button
						type='button'
						onClick={handleSave}
						disabled={
							isPending ||
							(!selectedDevices.length && selectedDevices.length == initialDevices?.length) ||
							(selectedDevices.length == initialDevices?.length &&
								selectedDevices?.every((c) => initialDevices?.includes(c)))
						}>
						{isPending ? 'Saving...' : 'Save Changes'}
					</Button>
					<Button
						type='button'
						variant='secondary'
						onClick={() => {
							setSelectedDevices(initialDevices ?? []);
						}}>
						Reset
					</Button>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}
