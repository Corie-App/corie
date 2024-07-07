'use client';

import { ButtonStyle } from '@/lib/types';
import { useAnnouncementConfig } from './provider';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const radiusStyles: Record<ButtonStyle, string> = {
	flat: 'rounded-none',
	curved: 'rounded',
	pill: 'rounded-full',
};

export default function AnnouncementPreview() {
	const { layout, imageUrl, title, description, buttonStyle, primaryColor } = useAnnouncementConfig();
	const proxyUrl = `/images?url=${encodeURIComponent(imageUrl ?? '')}`;

	return (
		<div className='bg-gray-50 grow flex justify-center items-center p-6'>
			<div
				className={`relative min-w-[350px] max-w-sm bg-white ring-1 ring-inset ring-gray-100 p-4 rounded-xl shadow-lg`}>
				<button
					type='button'
					className='ring-1 ring-inset ring-gray-100 absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-white rounded-full text-2xl cursor-pointer'>
					&times;
				</button>
				<div className='space-y-3'>
					<div className={cn('w-full flex gap-3', layout === 'image-left' ? 'items-center' : 'flex-col')}>
						{layout === 'default' ? null : (
							<div
								className={cn(
									'relative bg-gray-300 rounded-sm overflow-hidden',
									layout === 'image-left' ? 'aspect-square min-w-[116px] h-full' : 'h-[175px] w-full'
								)}>
								{imageUrl && (
									<Image
										fill
										priority
										src={proxyUrl}
										className='object-cover'
										alt='announcement preview image'
										sizes='(max-width: 768px) 100vw, 768px'
									/>
								)}
							</div>
						)}
						<div className='grow'>
							<h3 className='font-bold line-clamp-2 text-xl'>{title}</h3>
							<p className='text-sm text-wrap line-clamp-3'>{description}</p>
						</div>
					</div>
					<div className='flex justify-between gap-3'>
						<button
							className={cn(
								'w-full px-4 py-2 bg-transparent border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-80',
								radiusStyles[buttonStyle]
							)}>
							Don&apos;t show again
						</button>
						<button
							onClick={() => console.log('Upgrade to Pro')}
							className={cn(
								'w-full px-4 py-2 bg-black border-none text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-80',
								radiusStyles[buttonStyle]
							)}
							style={{ backgroundColor: primaryColor }}>
							Upgrade to Pro
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
