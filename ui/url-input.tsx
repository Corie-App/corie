import * as React from 'react';

import { cn } from '@/lib/utils';

export interface UrlInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const UrlInput = React.forwardRef<HTMLInputElement, UrlInputProps>(({ className, type, ...props }, ref) => {
	return (
		<div
			className={cn(
				'group flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
				className
			)}>
			<span className='flex select-none items-center text-gray-500 sm:text-sm'>https://</span>
			<input
				type={type}
				ref={ref}
				pattern='^(?!https?://).*$'
				className='w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
				{...props}
			/>
		</div>
	);
});
UrlInput.displayName = 'UrlInput';

export { UrlInput };
