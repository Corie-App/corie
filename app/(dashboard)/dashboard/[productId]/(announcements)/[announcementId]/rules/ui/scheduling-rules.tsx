'use client';

import { cn } from '@/lib/utils';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Button } from '@/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import { CalendarIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import DatetimePicker from './datetime-picker';
import { useServerAction } from 'zsa-react';
import { saveSchedulingRulesAction } from '../actions';
import { AnnouncementDuration, RulesKvResponse } from '@/lib/types';

const durations: Record<AnnouncementDuration, string> = {
	'1h': '1 hour',
	'1d': '1 day',
	'1w': '1 week',
	'1m': '1 month',
};

interface Props {
	rules: RulesKvResponse['schedule'] | null;
}

export default function SchedulingRules({ rules }: Props) {
	const params = useParams();
	const [startDate, setStartDate] = useState<Date | undefined>(
		rules?.startDate ? new Date(rules.startDate) : undefined
	);
	const [endDate, setEndDate] = useState<Date | undefined>(rules?.endDate ? new Date(rules.endDate) : undefined);
	const [duration, setDuration] = useState<AnnouncementDuration | undefined>(rules?.duration);
	const [endDateType, setEndDateType] = useState<'date' | 'duration'>(rules?.duration ? 'duration' : 'date');

	const handleEndSelect = (date: Date | undefined) => {
		if (startDate && date! < startDate) toast.error('End date must be after start date');
		else setEndDate(date);
	};

	const { executeFormAction, isPending } = useServerAction(saveSchedulingRulesAction, {
		onSuccess() {
			toast.success('Changes saved successfully');
		},
		onError({ err }) {
			if (err.code === 'ERROR') {
				toast.error('Unable to save changes', {
					description: 'End time must be after start time',
				});
			} else console.error(err);
		},
	});

	const handleTabChange = (value: string) => {
		setEndDateType(value as 'date' | 'duration');
		if (value === 'duration') setEndDate(undefined);
		else setDuration(undefined);
	};

	const handleReset = () => {
		setStartDate(rules?.startDate ? new Date(rules.startDate) : undefined);
		setEndDate(rules?.endDate ? new Date(rules.endDate) : undefined);
		setDuration(rules?.duration);
		setEndDateType(rules?.duration ? 'duration' : 'date');
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
				<form action={executeFormAction}>
					<input type='hidden' name='productId' value={params.productId as string} />
					<input type='hidden' name='announcementId' value={params.announcementId as string} />
					<input type='hidden' name='endDateType' value={endDateType} />

					{startDate && (
						<input
							readOnly
							type='startDate'
							name='startDate'
							className='hidden'
							value={startDate.toISOString()}
						/>
					)}
					{endDate && (
						<input
							readOnly
							type='endDate'
							name='endDate'
							className='hidden'
							value={endDate.toISOString()}
						/>
					)}
					<div className='space-y-4'>
						<div className='flex items-center justify-between gap-2'>
							<div className='flex items-center gap-2'>
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
												<DatetimePicker initialDate={endDate} onDateChange={handleEndSelect} />
											</PopoverContent>
										</Popover>
									) : (
										<Select
											name='duration'
											defaultValue={duration}
											onValueChange={(value) => setDuration(value as AnnouncementDuration)}>
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
							<div className='space-y-1'>
								<p className='text-muted-foreground'>Ending Options</p>
								<Tabs defaultValue={endDateType} onValueChange={handleTabChange}>
									<TabsList>
										<TabsTrigger value='date'>Date</TabsTrigger>
										<TabsTrigger value='duration'>Duration</TabsTrigger>
									</TabsList>
								</Tabs>
							</div>
						</div>
						{startDate && (
							<span className='inline-block ring-1 ring-inset ring-gray-100 text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-sm'>
								Starts on {startDate?.toLocaleString()}{' '}
								{endDate && `and ends on ${endDate.toLocaleString()}`}
								{duration && ` and runs for ${durations[duration]}`}
							</span>
						)}
					</div>

					<div className='flex items-center justify-between gap-2 mt-4'>
						<div className='flex items-center gap-2'>
							<Button disabled={isPending || !startDate}>
								{isPending ? 'Saving...' : 'Save Changes'}
							</Button>
							<Button type='button' onClick={handleReset} variant='secondary'>
								Reset
							</Button>
						</div>
					</div>
				</form>
			</AccordionContent>
		</AccordionItem>
	);
}
