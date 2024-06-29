interface Props {
	title: string;
	description: string;
}

export default function Announcement({ title, description }: Props) {
	return (
		<div id='corie-announcement' className='p-4 mb-4 bg-white rounded-lg shadow-lg'>
			<h2 className='text-xl font-semibold mb-2'>{title}</h2>
			<p className='text-gray-700'>{description}</p>
		</div>
	);
}
