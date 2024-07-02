'use client';

import { ButtonStyle } from '@/lib/types';
import { useAnnouncementConfig } from './provider';
import { cn } from '@/lib/utils';

const radiusStyles: Record<ButtonStyle, string> = {
	flat: 'rounded-none',
	curved: 'rounded',
	pill: 'rounded-full',
};

export default function AnnouncementPreview() {
	const { title, description, buttonStyle } = useAnnouncementConfig();

	return (
		<div className='bg-gray-50 grow flex justify-center items-center p-6'>
			<div
				className={`relative min-w-[350px] max-w-sm bg-white ring-1 ring-inset ring-gray-100 p-4 rounded-xl shadow-lg`}>
				<button
					type='button'
					className='ring-1 ring-inset ring-gray-100 absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-white rounded-full text-2xl cursor-pointer'>
					&times;
				</button>
				<h3 className='text-2xl font-bold mb-2 line-clamp-2'>{title}</h3>
				<p className='mb-4 text-sm line-clamp-3'>{description}</p>
				<div className='flex justify-between gap-3'>
					<button
						type='button'
						className={cn(
							'w-full px-4 py-2 bg-transparent border rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-80',
							radiusStyles[buttonStyle]
						)}>
						Don&apos;t show again
					</button>
					<button
						type='button'
						className={cn(
							'w-full px-4 py-2 bg-black border-none rounded-md text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-80',
							radiusStyles[buttonStyle]
						)}>
						Upgrade to Pro
					</button>
				</div>
			</div>
		</div>
	);
}
