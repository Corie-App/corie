import * as React from 'react';

import { cn } from '@/lib/utils';
import { XCircle } from 'lucide-react';
import { useImperativeHandle } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	showClearButton?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, showClearButton, type, ...props }, ref) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	useImperativeHandle(ref, () => inputRef.current!);

	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.value = '';

			// send empty value to onChange handler if provided
			if (props.onChange) {
				const event = new Event('input', { bubbles: true });
				Object.defineProperty(event, 'target', { writable: false, value: inputRef.current });
				Object.defineProperty(event, 'currentTarget', { writable: false, value: inputRef.current });
				props.onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
			}
		}
	};

	return (
		<div className='relative'>
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={inputRef}
				{...props}
			/>
			{showClearButton && (
				<button
					type='button'
					onClick={handleClear}
					className='absolute right-1 top-1 h-8 w-8 rounded-md bg-muted px-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50'>
					<XCircle size={16} />
				</button>
			)}
		</div>
	);
});
Input.displayName = 'Input';

export { Input };
