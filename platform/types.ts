export type Announcement = {
	title: string;
	description: string;
};

export type AnnouncementConfig = {
	theme: {
		primaryColor: string;
		secondaryColor: string;
	};
	cta: { link: string; text: string } | null;
	image: { src: string; alt: string } | null;
};
