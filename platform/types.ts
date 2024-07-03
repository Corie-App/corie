export type Announcement = {
	title: string;
	description: string;
	primaryColor: string;
	buttonStyle: ButtonStyle;
};

export type AnnouncementConfig = {
	theme: {
		primaryColor: string;
		secondaryColor: string;
	};
	cta: { link: string; text: string } | null;
	image: { src: string; alt: string } | null;
};

export type ButtonStyle = 'flat' | 'curved' | 'pill';
