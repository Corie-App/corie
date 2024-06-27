import { nanoid } from './nanoid';
import { Entity } from './types';

const prefixes = {
	product: 'prd',
	announcement: 'ann',
};
export const generateEntityId = (entity: Entity) => {
	return `${prefixes[entity]}_${nanoid()}`;
};
