export type Announcement = {
	id: string;
	title: string;
	layout: Layout;
	description: string;
	primaryColor: string;
	imageUrl: string | null;
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
export type Layout = 'default' | 'image-left' | 'image-top';

export interface Env {
	url: string;
	token: string;
	environment: 'production' | 'development';
}
