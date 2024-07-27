import { createOpenApiServerActionRouter } from 'zsa-openapi';
import { trackEvent } from './actions';

export const tinybirdRouter = createOpenApiServerActionRouter({
	pathPrefix: '/api/tinybird',
	defaults: { tags: ['tinybird'] },
}).get('/send', trackEvent);
