import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';

export default function AnnouncementLayoutPage({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-full h-full flex flex-col'>
			<Tabs defaultValue='details' className='py-3 bg-white flex justify-center'>
				<TabsList>
					<TabsTrigger value='details'>Details</TabsTrigger>
					<TabsTrigger value='theme'>Theme</TabsTrigger>
					<TabsTrigger value='rules'>Rules</TabsTrigger>
					<TabsTrigger value='analytics'>Analytics</TabsTrigger>
				</TabsList>
			</Tabs>
			{children}
		</div>
	);
}
