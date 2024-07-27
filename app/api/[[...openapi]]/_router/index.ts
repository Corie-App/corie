import { createOpenApiServerActionRouter } from 'zsa-openapi';
import { productsRouter } from './products';
import { announcementsRouter } from './announcements';
import { tinybirdRouter } from './tinybird';

export const router = createOpenApiServerActionRouter({
	extend: [productsRouter, announcementsRouter, tinybirdRouter],
});
