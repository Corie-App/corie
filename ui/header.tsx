import { SignInButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Header() {
	const { userId } = auth();

	return (
		<div className='flex items-center justify-between border-b border-gray-200 py-6 px-4 sm:px-6'>
			<Link href='/'>Corie</Link>
			{userId ? <UserButton /> : <SignInButton />}
		</div>
	);
}
