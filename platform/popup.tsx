import React from 'react';

interface PopupProps {
	title: string;
	description: string;
	onClose: () => void;
	theme?: {
		backgroundColor: string;
		textColor: string;
		buttonColor: string;
	};
	layout?: 'default' | 'image-left' | 'image-top';
	image?: string;
}

const Popup: React.FC<PopupProps> = ({ title, description, onClose, theme, layout = 'default', image }) => {
	const renderContent = () => (
		<>
			<h3 className='text-2xl font-bold mb-2 line-clamp-2'>{title}</h3>
			<p className='text-sm mb-4 text-wrap line-clamp-3'>{description}</p>
			<div className='flex justify-between gap-3'>
				<button
					onClick={() => console.log("Don't show again")}
					className='w-full px-4 py-2 bg-transparent border rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-80'
					style={{ borderColor: theme?.buttonColor, color: theme?.buttonColor }}>
					Don&apos;t show again
				</button>
				<button
					onClick={() => console.log('Upgrade to Pro')}
					className='w-full px-4 py-2 bg-black border-none rounded-md text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-80'
					style={{ backgroundColor: theme?.buttonColor }}>
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
		<div
			className={`bg-white ring-1 ring-inset ring-gray-100 max-w-sm p-4 rounded-xl shadow-lg ${getLayoutClasses()}`}
			style={{ backgroundColor: theme?.backgroundColor, color: theme?.textColor }}>
			<button
				onClick={onClose}
				className='ring-1 ring-inset ring-gray-100 absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-white rounded-full text-2xl cursor-pointer'>
				&times;
			</button>
			{layout === 'image-top' && renderImage()}
			{layout === 'image-left' && renderImage()}
			<div className={layout === 'image-left' ? 'flex-1' : ''}>{renderContent()}</div>
		</div>
	);
};

export default Popup;
