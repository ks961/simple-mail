import "@d3vtool/strict-env/tsetup";
import { CONFIG } from "./src/config";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: CONFIG.DATABASE_URL,
  },
});
