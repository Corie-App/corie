import Header from '@/ui/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='h-full flex flex-col'>
			<Header />
			{children}
		</div>
	);
}
