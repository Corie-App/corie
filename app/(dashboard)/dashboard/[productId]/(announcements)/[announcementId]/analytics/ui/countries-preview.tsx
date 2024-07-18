'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import FullCountriesList from './full-countries-list';
import CountriesChart from './countries-chart';

interface Props {
	data: { country: string | null; count: number | null }[];
}
export function CountriesPreview({ data }: Props) {
	return (
		<Card>
			<CardHeader>
				<div className='flex justify-between items-center gap-2'>
					<CardTitle>Countries</CardTitle>
					<FullCountriesList />
				</div>
				<CardDescription>Where your engagement is coming from</CardDescription>
			</CardHeader>
			<CardContent>
				<CountriesChart data={data} />
			</CardContent>
		</Card>
	);
}
