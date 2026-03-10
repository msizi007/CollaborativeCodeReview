import { query } from "../config/database";

export interface Comment {
  id?: number;
  content: string;
  created_at?: Date;
  last_updated?: Date;
  submission_id: number;
}

export const CREATE_COMMENT_QUERY =
  "CREATE TABLE IF NOT EXISTS comments (id serial primary key, content text, created_at timestamp, last_updated timestamp, submission_id int, FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE)";

export async function createCommentsTable() {
  await query(CREATE_COMMENT_QUERY, []);
}
