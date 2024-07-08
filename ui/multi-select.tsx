'use client';

import { Check, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { useState } from 'react';
import { Badge } from './badge';

type Option = {
	value: string;
	label: string;
};

interface Props<T extends Option> {
	options: T[];
	prefixKey?: keyof T;
	triggerLabel: string;
	matchingKey?: keyof T;
	emptyMessage?: string;
	searchPlaceholder?: string;
	shouldCloseOnSelect?: boolean;
	showPrefixOnSelectedValues?: boolean;
}

export default function MultieSelect<T>({
	options,
	prefixKey,
	matchingKey,
	triggerLabel,
	emptyMessage,
	searchPlaceholder,
	shouldCloseOnSelect = true,
	showPrefixOnSelectedValues = true,
}: Props<T & Option>) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<string[]>([]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div className='group flex gap-2 items-center h-10 w-full rounded-md border border-input bg-background py-2 pl-1'>
				<div className='flex items-center gap-1'>
					<PopoverTrigger asChild>
						<Button variant='ghost' className='h-8 px-2 gap-2 text-muted-foreground'>
							<PlusCircle size={16} className='' />
							{triggerLabel}
						</Button>
					</PopoverTrigger>
					<div className='w-[1px] h-4 bg-gray-200 rounded-lg' />
				</div>
				{selected.length > 0 ? (
					<div className='grow flex items-center gap-1.5 overflow-x-auto pr-2 scrollbar-hide'>
						{selected.map((selectedValue) => {
							const foundValue = options.find(
								(options) => options[matchingKey as keyof T] === selectedValue
							);
							if (!foundValue) return null;
							return (
								<Badge variant='secondary' key={selectedValue} className='min-w-max gap-1.5'>
									{showPrefixOnSelectedValues && (
										<span>{foundValue[prefixKey as keyof T] as string}</span>
									)}
									{foundValue.label}
								</Badge>
							);
						})}
					</div>
				) : (
					<Badge>All</Badge>
				)}
			</div>

			<PopoverContent className='min-w-[200px] p-0' alignOffset={-4} sideOffset={8} align='start'>
				<Command>
					<CommandInput placeholder={searchPlaceholder ?? 'Search...'} />
					<CommandList>
						<CommandEmpty>{emptyMessage ?? 'No results found.'}</CommandEmpty>
						<CommandGroup>
							{options.map((o) => (
								<CommandItem
									key={o.value}
									value={matchingKey ? (o[matchingKey as keyof T] as string) : o.value}
									onSelect={(currentValue) => {
										if (selected.includes(currentValue)) {
											setSelected(
												selected.filter((selectedValue) => selectedValue !== currentValue)
											);
										} else {
											setSelected([...selected, currentValue]);
										}

										if (shouldCloseOnSelect) setOpen(false);
									}}>
									<Check
										size={16}
										className={cn(
											'mr-2 text-primary',
											selected.includes(o[matchingKey as keyof T] as string)
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									<div className='flex w-full items-center gap-1.5'>
										{prefixKey && <span>{o[prefixKey] as string}</span>}
										{o.label}
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
