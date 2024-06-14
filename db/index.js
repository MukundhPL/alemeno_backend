import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js" ;
import pg from "pg";

const dbCredentials={
    host: "localhost",
    port: 5432,
    database: "alemeno",
    dialect: "postgres",
    user: "postgres",
    password: "1234",
}

const client = new pg.Client(dbCredentials)
await client.connect()

const db = drizzle(client,{schema,logger:true}) 
export default db