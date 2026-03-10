import { query } from "../config/database";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id?: number;
  title: string;
  content: string;
  status: SubmissionStatus;
  created_at?: Date;
  last_updated?: Date;
  project_id: number;
}

export const CREATE_SUBMISSION_TABLE =
  "CREATE TABLE IF NOT EXISTS submissions (id serial primary key, title text, content text, status text, project_id int, FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE)";

export async function createSubmissionsTable() {
  await query(CREATE_SUBMISSION_TABLE, []);
}
