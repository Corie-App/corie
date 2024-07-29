'use client';

import { Code } from 'lucide-react';
import { Button } from '@/ui/button';
import { toast } from 'sonner';

export default function CopyScript({ code }: { code: string }) {
	const handleClick = async () => {
		await navigator.clipboard.writeText(code);
		toast.success('Copied to clipboard');
	};

	return (
		<Button onClick={handleClick}>
			<Code size={16} className='mr-2' />
			Copy Script Code
		</Button>
	);
}
