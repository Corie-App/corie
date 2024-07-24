import { MAX_ENGAGEMENT_SCORE, BATCH_SIZE, MAX_READING_TIME_MS, OPTIMAL_ENGAGEMENT_TIME_MS } from './constants';
import { ClientInfo, AnalyticsEvent, ViewEvent, AnalyticsEventType, InteractionEvent } from './types';
import { getDeviceType } from './utils';

export class CorieAnalytics {
	private userId: string;
	private country: string | null;
	private clientInfo: ClientInfo;
	private eventQueue: AnalyticsEvent[] = [];

	constructor(userId: string, country: string | null) {
		this.userId = userId;
		this.country = country;
		this.clientInfo = this.gatherClientInfo();
	}

	public async trackAnnouncementView(announcementId: string, path: string): Promise<void> {
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

	public async trackInteraction(
		announcementId: string,
		action: AnalyticsEventType.DISMISS | AnalyticsEventType.CTA_CLICK,
		engagementTime: number,
		path: string
	): Promise<void> {
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
		// Cap engagement time at MAX_READING_TIME_MS
		const cappedTime = Math.min(engagementTime, MAX_READING_TIME_MS);

		// Calculate base score using a logarithmic curve
		// This will quickly rise and then taper off as time increases
		let score = (Math.log(cappedTime + 1) / Math.log(OPTIMAL_ENGAGEMENT_TIME_MS + 1)) * 100;

		// Adjust score based on action
		score *= action === AnalyticsEventType.CTA_CLICK ? 1.2 : 0.8;

		// Ensure score doesn't exceed MAX_ENGAGEMENT_SCORE
		score = Math.min(Math.round(score), MAX_ENGAGEMENT_SCORE);

		return score;
	}

	private encode(data: AnalyticsEvent): string {
		return btoa(encodeURIComponent(JSON.stringify(data)));
	}

	private async sendToTinybird(event: AnalyticsEvent): Promise<void> {
		const encodedEvent = this.encode(event);

		fetch(`/tinybird/send`, {
			method: 'POST',
			body: JSON.stringify(encodedEvent),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
