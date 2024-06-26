import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import Header from '@/ui/header';

const inter = Inter({ subsets: ['latin'] });

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
					<Header />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
