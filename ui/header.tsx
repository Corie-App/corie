import ProductSwitcherWrapper from '@/app/(dashboard)/dashboard/ui/product-switcher-wrapper';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Header() {
	const { userId } = auth();

	return (
		<div className='flex items-center justify-between border-b border-gray-200 p-4'>
			<div className='flex items-center gap-2'>
				<Link href='/'>
					<span className='text-3xl font-black text-primary'>Corie</span>
				</Link>
				<ProductSwitcherWrapper />
			</div>
			{userId ? <UserButton /> : <SignInButton />}
		</div>
	);
}
