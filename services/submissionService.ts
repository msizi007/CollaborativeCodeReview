import { query } from "../config/database";
import { Project } from "../models/projectModel";
import { Submission } from "../models/submissionModel";

export const createSubmissionDB = async (submission: Submission) => {
  const { rows } = await query(
    "INSERT INTO submissions (title, content, status, project_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      submission.title,
      submission.content,
      submission.status,
      submission.project_id,
    ]
  );
  return rows[0];
};

export const selectAllSubmissions = async () => {
  const { rows } = await query("SELECT * FROM submissions", []);
  return rows;
};

export const selectSubmissionById = async (id: number) => {
  const { rows } = await query("SELECT * FROM submissions WHERE id = $1", [id]);
  return rows[0];
};

export const updateSubmissionDB = async (id: number, status: string) => {
  const { rows } = await query(
    "UPDATE submissions SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return rows[0];
};

export const deleteSubmissionDB = async (id: number) => {
  const { rows } = await query(
    "DELETE FROM submissions WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};
