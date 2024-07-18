'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/chart';

const chartConfig = {
	views: { label: 'Views', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

interface Props {
	data: { time: string | null; views: number | null }[];
}

export default function ViewsChart({ data }: Props) {
	const formatDate = (value: string) => {
		const date = new Date(`${value}Z`);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
		});
	};

	return (
		<Card className='col-span-2'>
			<CardHeader>
				<CardTitle>Views</CardTitle>
				<CardDescription>Last 7 days</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className='max-h-[300px] w-full'>
					<LineChart accessibilityLayer data={data} margin={{ top: 12, left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='time'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={formatDate}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' labelFormatter={formatDate} />}
						/>
						<Line dataKey='views' type='natural' stroke='var(--color-views)' strokeWidth={2} dot={false} />
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
