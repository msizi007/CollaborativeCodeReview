import { query } from "../config/database";

export interface Project {
  id?: number;
  title: string;
  description: string;
  created_at?: Date;
  last_updated?: Date;
}

export const CREATE_PROJECT_QUERY =
  "CREATE TABLE IF NOT EXISTS projects (id serial primary key, title text, description text, created_at timestamp, last_updated timestamp)";

export async function createProjectsTable() {
  await query(CREATE_PROJECT_QUERY, []);
}
