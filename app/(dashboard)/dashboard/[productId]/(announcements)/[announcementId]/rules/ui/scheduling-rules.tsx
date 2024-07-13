'use client';

import { cn } from '@/lib/utils';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import { CalendarIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import DatetimePicker from './datetime-picker';

type Duration = '1h' | '1d' | '1w' | '1m';

export default function SchedulingRules() {
	const params = useParams();
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [duration, setDuration] = useState<Duration | undefined>(undefined);
	const [endDateType, setEndDateType] = useState<'date' | 'duration'>('date');

	const handleEndSelect = (date: Date | undefined) => {
		if (startDate && date! < startDate) toast.error('End date must be after start date');
		else setEndDate(date);
	};

	return (
		<AccordionItem value='schedule' className='border-b-0 bg-white ring-1 ring-inset ring-gray-200 rounded-lg'>
			<AccordionTrigger className='hover:no-underline px-3'>
				<div className='flex items-center gap-1.5'>
					<span className='text-sm font-medium'>⏳</span>
					<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
					Schedule
				</div>
			</AccordionTrigger>
			<AccordionContent className='pt-1 px-3'>
				<form>
					<input type='hidden' name='productId' value={params.productId as string} />
					<input type='hidden' name='announcementId' value={params.announcementId as string} />
					{startDate && (
						<input
							type='startDate'
							name='startDate'
							className='hidden'
							defaultValue={startDate.toISOString()}
						/>
					)}
					{endDate && (
						<input type='endDate' name='endDate' className='hidden' defaultValue={endDate.toISOString()} />
					)}
					{duration && <input type='duration' name='duration' className='hidden' defaultValue={duration} />}
					<div className='space-y-4'>
						<div className='flex items-center justify-between gap-2'>
							<div className='space-y-1'>
								<p className='text-muted-foreground'>Specify a start time</p>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'w-[240px] pl-3 text-left font-normal',
												!startDate && 'text-muted-foreground'
											)}>
											<span>
												{startDate ? (
													new Date(startDate).toLocaleString()
												) : (
													<span>Pick a date</span>
												)}
											</span>
											<CalendarIcon size={16} className='ml-auto opacity-50' />
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<DatetimePicker initialDate={startDate} onDateChange={setStartDate} />
									</PopoverContent>
								</Popover>
							</div>
							<div className='space-y-1'>
								<p className='text-muted-foreground'>Ending Options</p>
								<Tabs
									defaultValue={endDateType}
									onValueChange={(value) => setEndDateType(value as 'date' | 'duration')}>
									<TabsList>
										<TabsTrigger value='date'>Date</TabsTrigger>
										<TabsTrigger value='duration'>Duration</TabsTrigger>
									</TabsList>
								</Tabs>
							</div>
						</div>
						<div className='space-y-1'>
							<p className='text-muted-foreground'>
								{endDateType === 'date' ? 'Specify an end time' : 'Duration'}
							</p>
							{endDateType === 'date' ? (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'w-[240px] pl-3 text-left font-normal',
												!endDate && 'text-muted-foreground'
											)}>
											<span>
												{endDate ? (
													new Date(endDate).toLocaleString()
												) : (
													<span>Pick a date</span>
												)}
											</span>
											<CalendarIcon size={16} className='ml-auto opacity-50' />
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											initialFocus
											mode='single'
											selected={endDate}
											onSelect={handleEndSelect}
											disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
										/>
									</PopoverContent>
								</Popover>
							) : (
								<Select name='duration' onValueChange={(value) => setDuration(value as Duration)}>
									<SelectTrigger className='w-[180px]'>
										<SelectValue placeholder='Select a duration' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='1h'>1 hour</SelectItem>
										<SelectItem value='1d'>1 day</SelectItem>
										<SelectItem value='1w'>1 week</SelectItem>
										<SelectItem value='1m'>1 month</SelectItem>
									</SelectContent>
								</Select>
							)}
						</div>
					</div>
				</form>
			</AccordionContent>
		</AccordionItem>
	);
}
