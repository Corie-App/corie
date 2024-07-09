'use client';

import { countries } from '@/lib/countries';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Button } from '@/ui/button';
import MultiSelect from '@/ui/multi-select';
import { useState } from 'react';
import { useServerAction } from 'zsa-react';
import { saveGeolocationRulesAction } from '../actions';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { RulesKvResponse } from '@/lib/types';

interface Props {
	initialCountries: RulesKvResponse['geolocation']['countries'] | undefined;
}

export default function GeolocationRules({ initialCountries }: Props) {
	const params = useParams();
	const initialFoundCountries = initialCountries?.map((c) => countries.find((country) => country.value === c)!.label);
	const [selectedCountries, setSelectedCountries] = useState<string[]>(initialFoundCountries ?? []);
	const [reset, setReset] = useState(false);

	const { execute, isPending } = useServerAction(saveGeolocationRulesAction, {
		onSuccess(data) {
			toast.success('Changes saved successfully');
		},
		onError(args) {
			console.error(args);
		},
	});

	const handleSave = () => {
		const countryCodes = selectedCountries.map((c) => countries.find((country) => country.label === c)!.value);

		execute({
			countries: countryCodes,
			productId: params.productId as string,
			announcementId: params.announcementId as string,
		});
	};

	const handleSelect = (selected: string[]) => {
		setSelectedCountries(selected);
		setReset(false);
	};

	return (
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
				<MultiSelect
					reset={reset}
					prefixKey='flag'
					matchingKey='label'
					options={countries}
					onSelect={handleSelect}
					shouldCloseOnSelect={false}
					triggerLabel='Select country'
					emptyMessage='No country found.'
					initialValue={initialFoundCountries}
					searchPlaceholder='Search countries...'
				/>
				<div className='flex items-center gap-2'>
					<Button
						type='button'
						onClick={handleSave}
						disabled={
							isPending ||
							!selectedCountries.length ||
							(initialCountries &&
								selectedCountries.length == initialFoundCountries?.length &&
								selectedCountries?.every((c) => initialFoundCountries?.includes(c)))
						}>
						{isPending ? 'Saving...' : 'Save Changes'}
					</Button>
					<Button
						type='button'
						variant='secondary'
						onClick={() => {
							setReset(true);
							setSelectedCountries(initialCountries ?? []);
						}}>
						Reset
					</Button>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}
