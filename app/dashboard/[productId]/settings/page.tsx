export default function ProductPage({ params }: { params: { productId: string } }) {
	return (
		<div className=''>
			<h1>Settings Page</h1>
			<pre>{JSON.stringify(params, null, 2)}</pre>
		</div>
	);
}
