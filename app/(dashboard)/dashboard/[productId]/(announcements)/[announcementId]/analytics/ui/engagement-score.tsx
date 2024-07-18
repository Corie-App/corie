'use client';

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { ChartConfig, ChartContainer } from '@/ui/chart';
import { cn } from '@/lib/utils';

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
				<div className='flex items-center gap-2 font-medium leading-none'>
					<span
						className={cn(
							'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
							data.avgEngagementScore > 70
								? 'bg-green-50 text-green-700 ring-green-600/20'
								: data.avgEngagementScore > 40
								? 'bg-orange-50 text-orange-700 ring-orange-600/20'
								: 'bg-red-50 text-red-700 ring-red-600/20'
						)}>
						{data.avgEngagementScore > 70 ? 'High' : data.avgEngagementScore > 40 ? 'Moderate' : 'Low'}{' '}
						engagement
					</span>
				</div>
				<div className='leading-none text-muted-foreground'>
					{data.avgEngagementScore > 70
						? 'Users are highly interested in this announcement'
						: data.avgEngagementScore > 40
						? 'Users are showing interest in this announcement'
						: 'This announcement may need optimization for better engagement'}
				</div>
			</CardFooter>
		</Card>
	);
}
