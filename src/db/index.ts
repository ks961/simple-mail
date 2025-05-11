import { CONFIG } from '../config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(CONFIG.DATABASE_URL);