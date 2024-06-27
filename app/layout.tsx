import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import Header from '@/ui/header';
import ToastWrapper from '@/ui/toast-wrapper';
import Script from 'next/script';

export const metadata: Metadata = {
	title: 'Corie',
	description: 'Product updates at your fingertips',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={GeistSans.className}>
					<ToastWrapper />
					<header>
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</header>
					{/* <Header /> */}
					{children}
					<Script async src={`/corie.js?s=${process.env.EXAMPLE_SCRIPT_ID}`} />
				</body>
			</html>
		</ClerkProvider>
	);
}
