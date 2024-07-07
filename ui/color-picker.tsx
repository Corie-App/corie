'use client';

import { forwardRef, useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import type { ButtonProps } from './button';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { useForwardedRef } from '@/lib/use-forwarded-ref';

interface ColorPickerProps {
	value: string;
	formName?: string;
	onBlur?: () => void;
	onChange: (value: string) => void;
}

const ColorPicker = forwardRef<HTMLInputElement, Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps>(
	({ disabled, value, formName, onChange, onBlur, name, className, ...props }, forwardedRef) => {
		const ref = useForwardedRef(forwardedRef);
		const [open, setOpen] = useState(false);

		const parsedValue = useMemo(() => {
			return value || '#000';
		}, [value]);

		return (
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
					<div className='group flex h-10 w-[118.52px] gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
						<button
							{...props}
							type='button'
							className='h-6 w-6 rounded-sm'
							onClick={() => setOpen(true)}
							style={{ backgroundColor: parsedValue }}
						/>
						<input type='hidden' name={formName} value={parsedValue} />
						<span className='flex select-none items-center text-gray-500 sm:text-sm'>{parsedValue}</span>
					</div>
				</PopoverTrigger>
				<PopoverContent className='w-full space-y-2'>
					<HexColorPicker color={parsedValue} onChange={onChange} />
					<Input
						ref={ref}
						maxLength={7}
						value={parsedValue}
						onChange={(e) => onChange(e?.currentTarget?.value)}
					/>
				</PopoverContent>
			</Popover>
		);
	}
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
