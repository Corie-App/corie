'use client';

import type { ButtonStyle, Layout } from '@/lib/types';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ContextType {
	title: string;
	description: string;
	primaryColor: string;
	layout: Layout;
	imageUrl: string | null;
	buttonStyle: ButtonStyle;
	setTitle: (val: string) => void;
	setLayout: (val: Layout) => void;
	setImageUrl: (val: string) => void;
	setDescription: (val: string) => void;
	setPrimaryColor: (val: string) => void;
	setButtonStyle: (val: ButtonStyle) => void;
}

export const AnnouncementContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps extends PropsWithChildren {
	initialData: Omit<
		ContextType,
		'setTitle' | 'setDescription' | 'setButtonStyle' | 'setPrimaryColor' | 'setLayout' | 'setImageUrl'
	>;
}

export default function AnnouncementProvider({ children, initialData }: ProviderProps) {
	const [title, setTitle] = useState(initialData.title);
	const [layout, setLayout] = useState(initialData.layout);
	const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
	const [buttonStyle, setButtonStyle] = useState(initialData.buttonStyle);
	const [description, setDescription] = useState(initialData.description);
	const [primaryColor, setPrimaryColor] = useState(initialData.primaryColor);

	const value = useMemo(
		() => ({
			title,
			layout,
			setTitle,
			imageUrl,
			setLayout,
			setImageUrl,
			description,
			buttonStyle,
			primaryColor,
			setDescription,
			setButtonStyle,
			setPrimaryColor,
		}),
		[title, description, buttonStyle, primaryColor, layout, imageUrl]
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
