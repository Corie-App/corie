import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
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
				<body className={`${GeistSans.className} h-[100dvh]`}>
					<ToastWrapper />
					<Header />
					{children}
					<Script type='module' async src={`/platform/initial.js?s=${process.env.EXAMPLE_SCRIPT_ID}`} />
				</body>
			</html>
		</ClerkProvider>
	);
}
