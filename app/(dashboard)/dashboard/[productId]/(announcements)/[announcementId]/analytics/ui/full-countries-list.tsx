'use client';

import { useCountryAnalytics } from '@/hooks/use-country-analytics';
import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
import { useParams } from 'next/navigation';
import CountriesChart from './countries-chart';
import { useState } from 'react';

export default function FullCountriesList() {
	const params = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const { data, isLoading } = useCountryAnalytics(params.announcementId as string, isOpen);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' size='sm' onClick={() => setIsOpen(true)}>
					View All
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Countries</DialogTitle>
					<DialogDescription>Where your engagement is coming from</DialogDescription>
				</DialogHeader>
				<div className='max-h-[350px] overflow-y-auto'>
					{isLoading ? (
						<div className='animate-pulse space-y-2'>
							<div className='h-6 bg-gray-300 w-full rounded' />
							<div className='h-6 bg-gray-300 w-4/5 rounded' />
							<div className='h-6 bg-gray-300 w-3/5 rounded' />
							<div className='h-6 bg-gray-300 w-2/5 rounded' />
							<div className='h-6 bg-gray-300 w-1/5 rounded' />
						</div>
					) : !data || data.length === 0 ? (
						<div className='py-16 text-center text-sm text-gray-500'>No data available</div>
					) : (
						<CountriesChart data={data} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
