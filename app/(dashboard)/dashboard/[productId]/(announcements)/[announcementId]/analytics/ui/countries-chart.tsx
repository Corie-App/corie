import { countries } from '@/lib/countries';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/chart';

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
	data: { country: string | null; count: number | null }[];
}

export default function CountriesChart({ data }: Props) {
	const formatCountry = (value: string) => {
		const country = countries.find((c) => c.value === value);
		if (!country) return value;
		return `${country.flag} ${country.label}`;
	};

	return (
		<ChartContainer config={chartConfig}>
			<BarChart
				accessibilityLayer
				data={data}
				layout='vertical'
				margin={{
					right: 16,
				}}>
				<CartesianGrid horizontal={false} />
				<YAxis dataKey='country' type='category' tickLine={false} tickMargin={10} axisLine={false} hide />
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
					<LabelList dataKey='count' position='right' offset={8} className='fill-foreground' fontSize={12} />
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}
