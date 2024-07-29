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
	ctaButtonUrl: string;
	ctaButtonText: string;
	dismissButtonText: string;
	showDismissButton: boolean;
	setTitle: (val: string) => void;
	setLayout: (val: Layout) => void;
	setImageUrl: (val: string) => void;
	setDescription: (val: string) => void;
	setPrimaryColor: (val: string) => void;
	setCtaButtonUrl: (val: string) => void;
	setCtaButtonText: (val: string) => void;
	setDismissButtonText: (val: string) => void;
	setShowDismissButton: (val: boolean) => void;
	setButtonStyle: (val: ButtonStyle) => void;
}

export const AnnouncementContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps extends PropsWithChildren {
	initialData: Omit<
		ContextType,
		| 'setTitle'
		| 'setDescription'
		| 'setButtonStyle'
		| 'setPrimaryColor'
		| 'setLayout'
		| 'setImageUrl'
		| 'setDismissButtonText'
		| 'setShowDismissButton'
		| 'setCtaButtonText'
		| 'setCtaButtonUrl'
	>;
}

export default function AnnouncementProvider({ children, initialData }: ProviderProps) {
	const [title, setTitle] = useState(initialData.title);
	const [layout, setLayout] = useState(initialData.layout);
	const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
	const [buttonStyle, setButtonStyle] = useState(initialData.buttonStyle);
	const [description, setDescription] = useState(initialData.description);
	const [primaryColor, setPrimaryColor] = useState(initialData.primaryColor);
	const [ctaButtonUrl, setCtaButtonUrl] = useState(initialData.ctaButtonUrl);
	const [ctaButtonText, setCtaButtonText] = useState(initialData.ctaButtonText);
	const [dismissButtonText, setDismissButtonText] = useState(initialData.dismissButtonText);
	const [showDismissButton, setShowDismissButton] = useState(initialData.showDismissButton);

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
			ctaButtonUrl,
			ctaButtonText,
			setDescription,
			setButtonStyle,
			setCtaButtonUrl,
			setPrimaryColor,
			setCtaButtonText,
			dismissButtonText,
			setDismissButtonText,
			showDismissButton,
			setShowDismissButton,
		}),
		[
			title,
			layout,
			imageUrl,
			description,
			buttonStyle,
			primaryColor,
			ctaButtonUrl,
			ctaButtonText,
			dismissButtonText,
			showDismissButton,
		]
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
