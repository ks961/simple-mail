import * as pgCore from "drizzle-orm/pg-core";

export const users = pgCore.pgTable('users', {
    userId: pgCore.uuid('user_id').primaryKey().unique().defaultRandom(),
    email: pgCore.varchar('email', { length: 255 }).notNull().unique(),
    password: pgCore.text('password').notNull(),
    createdAt: pgCore.timestamp('created_at').defaultNow().notNull(),
});

export type TUser = Omit<typeof users.$inferSelect, "userId"> & {
    userId: string
};