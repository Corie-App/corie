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
			<ToastWrapper />
			<html lang='en'>
				<body className={GeistSans.className}>
					<Header />
					{children}
					{/* <Script async src='/corie.js?script_id=scr_testid' /> */}
				</body>
			</html>
		</ClerkProvider>
	);
}
