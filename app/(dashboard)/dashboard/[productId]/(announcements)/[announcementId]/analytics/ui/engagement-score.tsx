'use client';

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { ChartConfig, ChartContainer } from '@/ui/chart';

const chartConfig = {
	avgEngagementScore: {
		label: 'Average Engagement Score',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

interface Props {
	data: {
		totalInteractions: number;
		avgEngagementScore: number;
	};
}

export function EngagementScore({ data }: Props) {
	const { totalInteractions, avgEngagementScore } = data;

	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Engagement Score</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
					<RadialBarChart
						data={[{ avgEngagementScore, fill: 'var(--color-avgEngagementScore)' }]}
						startAngle={0}
						endAngle={250}
						innerRadius={80}
						outerRadius={110}>
						<PolarGrid
							gridType='circle'
							radialLines={false}
							stroke='none'
							className='first:fill-muted last:fill-background'
							polarRadius={[86, 74]}
						/>
						<RadialBar dataKey='avgEngagementScore' background cornerRadius={10} />
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'
												dominantBaseline='middle'>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className='fill-foreground text-4xl font-bold'>
													{Math.round(avgEngagementScore).toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className='fill-muted-foreground'>
													{totalInteractions.toLocaleString()} interactions
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 font-medium leading-none'>Trending up by 5.2% this month</div>
				<div className='leading-none text-muted-foreground'>Showing total visitors for the last 6 months</div>
			</CardFooter>
		</Card>
	);
}
