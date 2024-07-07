import React, { useEffect, useState } from 'react';
import { ButtonStyle } from '../../types';
import { cn } from '../../utils';

interface AnnouncementWrapperProps {
	title: string;
	description: string;
	onClose: () => void;
	primaryColor: string;
	buttonStyle: ButtonStyle;
	layout: 'default' | 'image-left' | 'image-top';
	image?: string;
}

const radiusStyles: Record<ButtonStyle, string> = {
	flat: 'corie-rounded-none',
	curved: 'corie-rounded',
	pill: 'corie-rounded-full',
};

const AnnouncementWrapper: React.FC<AnnouncementWrapperProps> = ({
	title,
	description,
	onClose,
	buttonStyle,
	primaryColor,
	layout = 'default',
	image,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			onClose();
		}, 250);
	};

	const renderImage = () =>
		layout === 'default' ? null : (
			<div
				className={cn(
					'corie-bg-gray-300 corie-rounded-lg',
					layout === 'image-left'
						? 'corie-aspect-square corie-min-w-[116px] corie-h-full'
						: 'corie-h-[175px] corie-w-full'
				)}
			/>
		);
	// image && (
	// 	// eslint-disable-next-line @next/next/no-img-element
	// 	<img src={image} alt='Announcement' className='corie-max-w-full corie-h-auto' />
	// );

	const renderContent = () => (
		<div className='corie-space-y-3'>
			<div
				className={cn(
					'corie-w-full corie-flex corie-gap-3',
					layout === 'image-left' ? 'corie-items-center' : 'corie-flex-col'
				)}>
				{renderImage()}
				<div className='corie-grow'>
					<h3 className='corie-font-bold corie-line-clamp-2 corie-text-xl'>{title}</h3>
					<p className='corie-text-sm corie-text-wrap corie-line-clamp-3'>{description}</p>
				</div>
			</div>
			<div className='corie-flex corie-justify-between corie-gap-3'>
				<button
					type='button'
					onClick={handleClose}
					className={cn(
						'corie-w-full corie-px-4 corie-py-2 corie-bg-transparent corie-border corie-text-sm corie-font-medium corie-transition-colors corie-focus:outline-none corie-focus:ring-2 corie-focus:ring-offset-2 corie-hover:bg-opacity-80',
						radiusStyles[buttonStyle]
					)}>
					Don&apos;t show again
				</button>
				<button
					type='button'
					onClick={() => console.log('Upgrade to Pro')}
					className={cn(
						'corie-w-full corie-px-4 corie-py-2 corie-bg-black corie-border-none corie-text-sm corie-font-medium corie-text-white corie-transition-colors corie-focus:outline-none corie-focus:ring-2 corie-focus:ring-offset-2 corie-hover:bg-opacity-80',
						radiusStyles[buttonStyle]
					)}
					style={{ backgroundColor: primaryColor }}>
					Upgrade to Pro
				</button>
			</div>
		</div>
	);

	return (
		<div
			className={cn(
				'corie-fixed corie-right-4 corie-bottom-4 corie-z-50 corie-bg-white corie-min-w-[350px] corie-ring-1 corie-ring-inset corie-ring-gray-100 corie-max-w-sm corie-p-4 corie-rounded-xl corie-shadow-lg',
				isVisible ? 'corie-animate-fade-in-up' : '',
				isClosing ? 'corie-animate-fade-out' : ''
			)}>
			<button
				onClick={handleClose}
				className='corie-ring-1 corie-ring-inset corie-ring-gray-100 corie-absolute corie--top-2 corie--right-2 corie-w-6 corie-h-6 corie-flex corie-items-center corie-justify-center corie-bg-white corie-rounded-full corie-text-2xl corie-cursor-pointer'>
				&times;
			</button>
			{renderContent()}
		</div>
	);
};

export default AnnouncementWrapper;
