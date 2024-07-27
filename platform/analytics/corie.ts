import { MAX_ENGAGEMENT_SCORE, MAX_READING_TIME_MS, OPTIMAL_ENGAGEMENT_TIME_MS } from './constants';
import { ClientInfo, AnalyticsEvent, ViewEvent, AnalyticsEventType, InteractionEvent } from './types';
import { getDeviceType } from './utils';

export class CorieAnalytics {
	private userId: string;
	private country: string | null;
	private clientInfo: ClientInfo;
	private baseUrl: string;

	constructor(userId: string, country: string | null, baseUrl: string) {
		this.userId = userId;
		this.country = country;
		this.clientInfo = this.gatherClientInfo();
		this.baseUrl = baseUrl;
	}

	public trackAnnouncementView(announcementId: string, path: string): void {
		const event: ViewEvent = {
			path,
			announcementId,
			userId: this.userId,
			type: AnalyticsEventType.VIEW,
			timestamp: new Date().toISOString(),
			...this.clientInfo,
		};
		this.sendToTinybird(event);
	}

	public trackInteraction(
		announcementId: string,
		action: AnalyticsEventType.DISMISS | AnalyticsEventType.CTA_CLICK,
		engagementTime: number,
		path: string
	): void {
		const engagementScore = this.calculateEngagementScore(engagementTime, action);
		const event: InteractionEvent = {
			path,
			type: action,
			announcementId,
			engagementTime,
			engagementScore,
			userId: this.userId,
			timestamp: new Date().toISOString(),
			...this.clientInfo,
		};
		this.sendToTinybird(event);
	}

	public updateClientInfo(): void {
		this.clientInfo = this.gatherClientInfo();
	}

	private gatherClientInfo(): ClientInfo {
		return {
			country: this.country,
			deviceType: getDeviceType(),
			language: navigator.language,
			userAgent: navigator.userAgent,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		};
	}

	private calculateEngagementScore(engagementTime: number, action: AnalyticsEventType): number {
		const cappedTime = Math.min(engagementTime, MAX_READING_TIME_MS);
		let score = (Math.log(cappedTime + 1) / Math.log(OPTIMAL_ENGAGEMENT_TIME_MS + 1)) * 100;
		score *= action === AnalyticsEventType.CTA_CLICK ? 1.2 : 0.8;
		return Math.min(Math.round(score), MAX_ENGAGEMENT_SCORE);
	}

	private encode(data: AnalyticsEvent): string {
		return btoa(encodeURIComponent(JSON.stringify(data)));
	}

	private sendToTinybird(event: AnalyticsEvent): void {
		const encodedEvent = this.encode(event);
		const url = `${this.baseUrl}/signal/evt`;

		if (navigator.sendBeacon) {
			const blob = new Blob([encodedEvent], { type: 'application/json' });
			navigator.sendBeacon(url, blob);
		} else {
			fetch(url, {
				method: 'POST',
				body: JSON.stringify(encodedEvent),
				headers: { 'Content-Type': 'application/json' },
				// Use keepalive to ensure the request is sent even if the page is unloading
				keepalive: true,
			}).catch((error) => console.error('Failed to send analytics event:', error));
		}
	}
}
