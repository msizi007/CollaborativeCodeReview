require("dotenv").config();
import { Pool } from "pg";

// pool connection
export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// create a query function
export const query = (text: string, params: any) => db.query(text, params);

// test connection function
export const testConnection = async () => {
  try {
    await db.query("SELECT NOW()");
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};
