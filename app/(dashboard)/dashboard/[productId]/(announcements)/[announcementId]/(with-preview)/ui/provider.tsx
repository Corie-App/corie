'use client';

import type { ButtonStyle } from '@/lib/types';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ContextType {
	title: string;
	description: string;
	buttonStyle: ButtonStyle;
	setTitle: (val: string) => void;
	setButtonStyle: (val: ButtonStyle) => void;
	setDescription: (val: string) => void;
}

export const AnnouncementContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps extends PropsWithChildren {
	initialData: Omit<ContextType, 'setTitle' | 'setDescription' | 'setButtonStyle'>;
}

export default function AnnouncementProvider({ children, initialData }: ProviderProps) {
	const [title, setTitle] = useState(initialData.title);
	const [buttonStyle, setButtonStyle] = useState(initialData.buttonStyle);
	const [description, setDescription] = useState(initialData.description);

	const value = useMemo(
		() => ({
			title,
			setTitle,
			description,
			buttonStyle,
			setDescription,
			setButtonStyle,
		}),
		[title, description, buttonStyle]
	);

	return <AnnouncementContext.Provider value={value}>{children}</AnnouncementContext.Provider>;
}

export const useAnnouncementConfig = () => {
	const context = useContext(AnnouncementContext);

	if (!context) {
		throw new Error('useAnnouncementConfig must be used within a <AnnouncementProvider />');
	}

	return context;
};
