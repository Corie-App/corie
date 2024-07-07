import { timestamp, pgTable, text, boolean, varchar, pgEnum } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

export const buttonStyleEnum = pgEnum('button_style', ['flat', 'curved', 'pill']);
export const layoutEnum = pgEnum('layout', ['default', 'image-left', 'image-top']);

export const products = pgTable('products', {
	id: varchar('id', { length: 50 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	domain: varchar('domain', { length: 255 }).notNull(),
	creatorId: varchar('creator_id', { length: 50 }).notNull(),
	scriptId: varchar('script_id', { length: 50 }).unique().notNull(),
	createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const announcements = pgTable('announcements', {
	id: varchar('id', { length: 50 }).primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	productId: varchar('product_id', { length: 50 })
		.references(() => products.id)
		.notNull(),
	isActive: boolean('is_active').default(false).notNull(),
	imageUrl: varchar('image_url', { length: 255 }),
	layout: layoutEnum('layout').default('default').notNull(),
	buttonStyle: buttonStyleEnum('button_style').default('flat').notNull(),
	primaryColor: varchar('primary_color', { length: 7 }).default('#000').notNull(),
	creatorId: varchar('creator_id', { length: 50 }).notNull(),
	createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export type Product = InferSelectModel<typeof products>;
export type Announcement = InferSelectModel<typeof announcements>;
