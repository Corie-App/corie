import { createOpenApiServerActionRouter } from 'zsa-openapi';
import { productsRouter } from './products';
import { announcementsRouter } from './announcements';

export const router = createOpenApiServerActionRouter({
	extend: [productsRouter, announcementsRouter],
});
