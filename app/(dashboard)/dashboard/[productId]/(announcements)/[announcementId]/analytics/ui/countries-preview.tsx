'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/chart';
import { countries } from '@/lib/countries';

const chartConfig = {
	country: {
		label: 'Country',
		color: 'hsl(var(--chart-1))',
	},
	label: {
		color: 'hsl(var(--background))',
	},
} satisfies ChartConfig;

interface Props {
	data: { country: string; count: number }[];
}
export function CountriesPreview({ data }: Props) {
	const formatCountry = (value: string) => {
		const country = countries.find((c) => c.value === value);
		if (!country) return value;
		return `${country.flag} ${country.label}`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Countries</CardTitle>
				<CardDescription>Where your engagement is coming from</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={data}
						layout='vertical'
						margin={{
							right: 16,
						}}>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey='country'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							hide
						/>
						<XAxis dataKey='count' type='number' hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideIndicator labelFormatter={formatCountry} />}
						/>
						<Bar dataKey='count' layout='vertical' fill='var(--color-country)' radius={4}>
							<LabelList
								dataKey='country'
								position='insideLeft'
								offset={8}
								className='fill-[--color-label]'
								fontSize={12}
								formatter={formatCountry}
							/>
							<LabelList
								dataKey='count'
								position='right'
								offset={8}
								className='fill-foreground'
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
