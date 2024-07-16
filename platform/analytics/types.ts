export enum AnalyticsEventType {
	VIEW = 'view',
	DISMISS = 'dismiss',
	CTA_CLICK = 'cta_click',
}

export enum DeviceType {
	MOBILE = 'mobile',
	TABLET = 'tablet',
	DESKTOP = 'desktop',
}

interface BaseEvent {
	path: string;
	userId: string;
	language: string;
	timezone: string;
	timestamp: string;
	userAgent: string;
	country: string | null;
	deviceType: DeviceType;
	announcementId: string;
}

export interface ViewEvent extends BaseEvent {
	type: AnalyticsEventType.VIEW;
}

export interface InteractionEvent extends BaseEvent {
	type: AnalyticsEventType.DISMISS | AnalyticsEventType.CTA_CLICK;
	engagementTime: number;
	engagementScore: number;
}

export type AnalyticsEvent = ViewEvent | InteractionEvent;

export interface ClientInfo {
	timezone: string;
	language: string;
	userAgent: string;
	country: string | null;
	deviceType: DeviceType;
}
