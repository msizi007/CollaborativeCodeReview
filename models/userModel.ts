import { query } from "../config/database";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export const CREATE_USER_TABLE =
  "CREATE TABLE IF NOT EXISTS users (id serial primary key, username text, email text, password text)";

export async function createUsersTable() {
  await query(CREATE_USER_TABLE, []);
}
