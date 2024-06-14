import  { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './db/schema.js',
  out: './db/migration',
  dialect: 'postgresql' , // 'postgresql' | 'mysql' | 'sqlite'
  // driver:"pg",
  dbCredentials: {
    host: "localhost",
    port: "5432",
    user: "postgres",
    password: "1234",
    database: "alemeno",

  },
  ssl:false,
  verbose:true,
  strict:true
});