'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/ui/command';
import { DialogTrigger } from '@/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { useState } from 'react';
import NewProductModal from './new-product-modal';

interface Props {
	products: {
		id: string;
		name: string;
	}[];
}

export default function ProductSwitcher({ products }: Props) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const segments = useSelectedLayoutSegments();
	const [showNewProductDialog, setShowNewProductDialog] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(products[0] || null);

	return (
		<NewProductModal show={showNewProductDialog} showTrigger={false} onClose={() => setShowNewProductDialog(false)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						aria-label='Select a team'
						className='w-[200px] justify-between'>
						{selectedProduct?.name}
						<ChevronsUpDown size={16} className='ml-auto shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0'>
					<Command>
						<CommandList>
							<CommandInput placeholder='Search team...' />
							<CommandEmpty>No product found.</CommandEmpty>
							{products.map((p) => (
								<CommandItem
									key={p.id}
									onSelect={() => {
										setSelectedProduct(p);
										setOpen(false);
										if (segments.length > 1) router.push(`/dashboard/${p.id}/${segments[1]}`);
										else router.push(`/dashboard/${p.id}`);
									}}
									className='text-sm rounded-none'>
									{p.name}
									<Check
										size={16}
										className={cn(
											'ml-auto',
											selectedProduct.id === p.id ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											setOpen(false);
											setShowNewProductDialog(true);
										}}>
										<PlusCircle size={20} className='mr-2' />
										Create Team
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</NewProductModal>
	);
}
