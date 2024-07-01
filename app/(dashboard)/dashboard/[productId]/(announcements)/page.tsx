import { GanttChart } from 'lucide-react';

export default async function AnnouncementsPage() {
	return (
		<div className='p-4 w-full'>
			<div className='bg-white border border-dashed rounded-lg p-12 text-center'>
				<GanttChart size={48} className='mx-auto mb-4 text-muted-foreground' />
				<h2 className='text-lg font-semibold'>No announcement selected</h2>
				<p className='text-muted-foreground mb-6'>Select an announcement on the left to make changes</p>
			</div>
		</div>
	);
}
