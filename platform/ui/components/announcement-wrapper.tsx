import React, { useEffect, useState } from 'react';
import { Announcement, ButtonStyle } from '../../utils/types';
import { cn } from '../../utils';
import { AnalyticsEventType, CorieAnalytics } from '../../analytics';

interface AnnouncementWrapperProps {
	baseUrl: string;
	onClose: () => void;
	analytics: CorieAnalytics;
	announcements: Announcement[];
}

const radiusStyles: Record<ButtonStyle, string> = {
	flat: 'corie-rounded-none',
	curved: 'corie-rounded',
	pill: 'corie-rounded-full',
};

const AnnouncementWrapper: React.FC<AnnouncementWrapperProps> = ({ baseUrl, analytics, announcements, onClose }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [viewTimestamp, setViewTimestamp] = useState(Date.now());
	const { title, description, layout, imageUrl, primaryColor, buttonStyle } = announcements[0];

	useEffect(() => {
		setIsVisible(true);
		setViewTimestamp(Date.now());
		analytics.trackAnnouncementView(announcements[0].id, window.location.pathname);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleInteraction = (announcementId: string, action: 'dismiss' | 'cta_click') => {
		const engagementTime = Date.now() - viewTimestamp;

		analytics.trackInteraction(
			announcementId,
			action === 'dismiss' ? AnalyticsEventType.DISMISS : AnalyticsEventType.CTA_CLICK,
			engagementTime,
			window.location.pathname
		);
	};

	const handleClose = (config: { track: boolean } = { track: true }) => {
		if (config?.track) handleInteraction(announcements[0].id, 'dismiss');

		setIsClosing(true);
		setTimeout(() => {
			onClose();
		}, 250);
	};

	const handleCTAClick = () => {
		handleInteraction(announcements[0].id, 'cta_click');
		handleClose({ track: false });
	};

	const renderImage = () => {
		const proxyUrl = `${baseUrl}/images?url=${encodeURIComponent(imageUrl ?? '')}`;

		return layout === 'default' ? null : (
			<div
				className={cn(
					'corie-relative corie-bg-gray-300 corie-rounded-md corie-overflow-hidden',
					layout === 'image-left'
						? 'corie-aspect-square corie-min-w-[116px] corie-h-full'
						: 'corie-h-[175px] corie-w-full'
				)}>
				{imageUrl && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={proxyUrl}
						fetchPriority='high'
						alt='announcement preview image'
						className='corie-object-cover corie-h-full corie-w-full'
					/>
				)}
			</div>
		);
	};
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
					onClick={() => handleClose()}
					className={cn(
						'corie-w-full corie-px-4 corie-py-2 corie-bg-transparent corie-border corie-text-sm corie-font-medium corie-transition-colors corie-focus:outline-none corie-focus:ring-2 corie-focus:ring-offset-2 corie-hover:bg-opacity-80',
						radiusStyles[buttonStyle]
					)}>
					Don&apos;t show again
				</button>
				<button
					type='button'
					onClick={handleCTAClick}
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
				onClick={() => handleClose()}
				className='corie-ring-1 corie-ring-inset corie-ring-gray-100 corie-absolute corie--top-2 corie--right-2 corie-w-6 corie-h-6 corie-flex corie-items-center corie-justify-center corie-bg-white corie-rounded-full corie-text-2xl corie-cursor-pointer'>
				&times;
			</button>
			{renderContent()}
		</div>
	);
};

export default AnnouncementWrapper;
