'use client';

import { Switch } from '@/ui/switch';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { toggleAnnouncementActiveAction } from '../actions';

interface Props {
	productId: string;
	isActive: boolean;
	announcementId: string;
}

export default function ActiveToggle({ productId, isActive, announcementId }: Props) {
	const { execute } = useServerAction(toggleAnnouncementActiveAction, {
		onSuccess({ data: { isActive } }) {
			toast.success(`Announcement has been turned ${isActive ? 'on' : 'off'}`);
		},
		onError(args) {
			console.error(args);
		},
	});

	return (
		<Switch
			defaultChecked={isActive}
			onCheckedChange={(checked) => execute({ isActive: checked, productId, announcementId })}
		/>
	);
}
