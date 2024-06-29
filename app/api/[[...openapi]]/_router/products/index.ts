import { createOpenApiServerActionRouter } from 'zsa-openapi';
import { matchDomain } from './actions';

export const productsRouter = createOpenApiServerActionRouter({
	pathPrefix: '/api/products',
	defaults: { tags: ['products'] },
}).get('/domain', matchDomain);
