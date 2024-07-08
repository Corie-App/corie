import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import MultipleSelector from '@/ui/multi-select';
import { countries } from '@/lib/countries';

export default function AnnouncementRulesPage() {
	return (
		<div className='h-full mx-auto max-w-2xl w-full py-6'>
			<Accordion type='multiple' className='space-y-4'>
				<AccordionItem
					value='geolocation'
					className='border-b-0 bg-white ring-1 ring-inset ring-gray-200 rounded-lg px-3'>
					<AccordionTrigger className='hover:no-underline'>
						<div className='flex items-center gap-1.5'>
							<span className='text-sm font-medium'>🌍</span>
							<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
							Geolocation
						</div>
					</AccordionTrigger>
					<AccordionContent className='space-y-2'>
						<p className='text-muted-foreground'>
							Specify which countries this announcement should be displayed in
						</p>
						<MultipleSelector
							prefixKey='flag'
							matchingKey='label'
							options={countries}
							shouldCloseOnSelect={false}
							triggerLabel='Select country'
							emptyMessage='No country found.'
							searchPlaceholder='Search countries...'
						/>
					</AccordionContent>
				</AccordionItem>
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
