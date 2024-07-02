'use client';

import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ContextType {
	title: string;
	description: string;
	setTitle: (val: string) => void;
	setDescription: (val: string) => void;
}

export const AnnouncementContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps extends PropsWithChildren {
	initialData: Omit<ContextType, 'setTitle' | 'setDescription'>;
}

export default function AnnouncementProvider({ children, initialData }: ProviderProps) {
	const [title, setTitle] = useState(initialData.title);
	const [description, setDescription] = useState(initialData.description);

	const value = useMemo(
		() => ({
			title,
			setTitle,
			description,
			setDescription,
		}),
		[title, description]
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
