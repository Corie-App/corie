'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Calendar } from '@/ui/calendar';

const hours = [...Array.from({ length: 24 }, (_, i) => i.toString())];
const minutes = [...Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i.toString()))];

interface Props {
	initialDate?: Date;
	onDateChange: (date: Date) => void;
}

export default function DatetimePicker({ initialDate, onDateChange }: Props) {
	const [date, setDate] = useState<Date | undefined>(initialDate);
	const [showHour, setShowHour] = useState(false);
	const [showMinute, setShowMinute] = useState(false);
	const [hour, setHour] = useState(initialDate?.getHours().toString() ?? '0');
	const [minute, setMinute] = useState(initialDate?.getMinutes().toString() ?? '00');

	useEffect(() => {
		setShowHour(false);
		setShowMinute(false);
	}, [hour, minute]);

	useEffect(() => {
		if (date) onDateChange(date);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);

	const handleHourSelect = (value: string) => {
		setHour(value);
		setDate(
			date
				? new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(value), date.getMinutes())
				: undefined
		);
	};

	const handleMinuteSelect = (value: string) => {
		setMinute(value);
		setDate(
			date
				? new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), parseInt(value))
				: undefined
		);
	};

	const handleDateSelect = (value: Date | undefined) => {
		if (!value) return setDate(undefined);
		setDate(
			new Date(
				value.getFullYear(),
				value.getMonth(),
				value.getDate(),
				date?.getHours() ?? 0,
				date?.getMinutes() ?? 0
			)
		);
	};

	return (
		<>
			<Calendar
				required
				month={date}
				initialFocus
				mode='single'
				selected={date}
				onSelect={handleDateSelect}
				disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
			/>
			<div className='p-3 pt-0 flex items-center gap-2'>
				<Popover open={showHour} onOpenChange={setShowHour}>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							role='combobox'
							aria-expanded={showHour}
							className='w-full justify-between'>
							{hour}
							<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='p-0'>
						<Picker value={hour} type='hour' data={hours} onSelect={handleHourSelect} />
					</PopoverContent>
				</Popover>
				<Popover open={showMinute} onOpenChange={setShowMinute}>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							role='combobox'
							aria-expanded={showMinute}
							className='w-full justify-between'>
							{minute}
							<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='p-0'>
						<Picker value={minute} type='minute' data={minutes} onSelect={handleMinuteSelect} />
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
}

type PickerProps = {
	value: string;
	data: string[];
	type: 'hour' | 'minute';
	onSelect: (value: string) => void;
};

const Picker = ({ value, type, onSelect, data }: PickerProps) => (
	<Command>
		<CommandInput placeholder={`Search ${type}...`} />
		<CommandList>
			<CommandEmpty>No {type} found.</CommandEmpty>
			<CommandGroup>
				{data.map((el) => (
					<CommandItem key={el} value={el} onSelect={onSelect}>
						<Check className={cn('mr-2 h-4 w-4', value === el ? 'opacity-100' : 'opacity-0')} />
						{el}
					</CommandItem>
				))}
			</CommandGroup>
		</CommandList>
	</Command>
);
