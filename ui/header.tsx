import { SignInButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Header() {
	const user = await currentUser();

	return (
		<div className='flex items-center justify-between border-b border-gray-200 py-6 px-4 sm:px-6'>
			<Link href='/'>Corie</Link>
			{!user ? <UserButton /> : <SignInButton />}
		</div>
	);
}
