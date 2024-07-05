import React from 'react';
import { ButtonStyle } from '../../types';
import { cn } from '../../utils';

interface AnnouncementWrapperProps {
	title: string;
	description: string;
	onClose: () => void;
	primaryColor: string;
	buttonStyle: ButtonStyle;
	layout?: 'default' | 'image-left' | 'image-top';
	image?: string;
}

const radiusStyles: Record<ButtonStyle, string> = {
	flat: 'rounded-none',
	curved: 'rounded',
	pill: 'rounded-full',
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
	const renderContent = () => (
		<>
			<h3 className='text-2xl font-bold mb-2 line-clamp-2'>{title}</h3>
			<p className='text-sm mb-4 text-wrap line-clamp-3'>{description}</p>
			<div className='flex justify-between gap-3'>
				<button
					onClick={() => console.log("Don't show again")}
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
		</>
	);

	const renderImage = () =>
		image && (
			// eslint-disable-next-line @next/next/no-img-element
			<img src={image} alt='Announcement' className='max-w-full h-auto mb-4' />
		);

	const getLayoutClasses = () => {
		switch (layout) {
			case 'image-left':
				return 'flex items-center gap-4';
			case 'image-top':
				return 'flex flex-col';
			default:
				return '';
		}
	};

	return (
		<div className='corie-root'>
			<div
				className={`bg-white min-w-[350px] ring-1 ring-inset ring-gray-100 max-w-sm p-4 rounded-xl shadow-lg ${getLayoutClasses()}`}>
				<button
					onClick={onClose}
					className='ring-1 ring-inset ring-gray-100 absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-white rounded-full text-2xl cursor-pointer'>
					&times;
				</button>
				{layout === 'image-top' && renderImage()}
				{layout === 'image-left' && renderImage()}
				<div className={layout === 'image-left' ? 'flex-1' : ''}>{renderContent()}</div>
			</div>
		</div>
	);
};

export default AnnouncementWrapper;
