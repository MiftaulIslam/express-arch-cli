import { mysqlTable, serial, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

export const sampleTable = mysqlTable('samples', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 80 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
