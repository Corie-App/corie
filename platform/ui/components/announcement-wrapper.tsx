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
	const renderContent = () => (
		<>
			<h3 className='corie-text-2xl corie-font-bold corie-mb-2 corie-line-clamp-2'>{title}</h3>
			<p className='corie-text-sm corie-mb-4 corie-text-wrap corie-line-clamp-3'>{description}</p>
			<div className='corie-flex corie-justify-between corie-gap-3'>
				<button
					onClick={() => console.log("Don't show again")}
					className={cn(
						'corie-w-full corie-px-4 corie-py-2 corie-bg-transparent corie-border corie-text-sm corie-font-medium corie-transition-colors corie-focus:outline-none corie-focus:ring-2 corie-focus:ring-offset-2 corie-hover:bg-opacity-80',
						radiusStyles[buttonStyle]
					)}>
					Don&apos;t show again
				</button>
				<button
					onClick={() => console.log('Upgrade to Pro')}
					className={cn(
						'corie-w-full corie-px-4 corie-py-2 corie-bg-black corie-border-none corie-text-sm corie-font-medium corie-text-white corie-transition-colors corie-focus:outline-none corie-focus:ring-2 corie-focus:ring-offset-2 corie-hover:bg-opacity-80',
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
			<img src={image} alt='Announcement' className='corie-max-w-full corie-h-auto corie-mb-4' />
		);

	const getLayoutClasses = () => {
		switch (layout) {
			case 'image-left':
				return 'corie-flex corie-items-center corie-gap-4';
			case 'image-top':
				return 'corie-flex corie-flex-col';
			default:
				return '';
		}
	};

	return (
		<div
			className={`corie-fixed corie-right-4 corie-bottom-4 corie-z-50 corie-bg-white corie-min-w-[350px] corie-ring-1 corie-ring-inset corie-ring-gray-100 corie-max-w-sm corie-p-4 corie-rounded-xl corie-shadow-lg ${getLayoutClasses()}`}>
			<button
				onClick={onClose}
				className='corie-ring-1 corie-ring-inset corie-ring-gray-100 corie-absolute corie--top-2 corie--right-2 corie-w-6 corie-h-6 corie-flex corie-items-center corie-justify-center corie-bg-white corie-rounded-full corie-text-2xl corie-cursor-pointer'>
				&times;
			</button>
			{layout === 'image-top' && renderImage()}
			{layout === 'image-left' && renderImage()}
			<div className={layout === 'image-left' ? 'corie-flex-1' : ''}>{renderContent()}</div>
		</div>
	);
};

export default AnnouncementWrapper;
