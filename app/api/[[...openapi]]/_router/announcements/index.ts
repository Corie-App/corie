import { createOpenApiServerActionRouter } from 'zsa-openapi';
import { getAnnouncements } from './actions';

export const announcementsRouter = createOpenApiServerActionRouter({
	pathPrefix: '/api/announcements',
	defaults: { tags: ['announcements'] },
}).get('/', getAnnouncements);
