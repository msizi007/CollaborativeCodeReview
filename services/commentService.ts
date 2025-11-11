import { log } from "node:console";
import { query } from "../config/database";

export const selectAllComments = async (
  projectId: number
): Promise<Comment[]> => {
  const { rows } = await query(
    "SELECT * FROM comments WHERE submission_id = $1",
    [projectId]
  );
  return rows;
};

export const selectCommentById = async (id: number): Promise<Comment> => {
  const { rows } = await query("SELECT * FROM comments WHERE id = $1", [id]);
  return rows[0];
};

export const insertComment = async (
  content: string,
  submissionId: number
): Promise<Comment> => {
  log(201, content, submissionId);
  const { rows } = await query(
    "INSERT INTO comments (content, submission_id) VALUES ($1, $2) RETURNING *",
    [content, submissionId]
  );
  return rows[0];
};

export const deleteCommentDB = async (id: number): Promise<Comment> => {
  const { rows } = await query(
    "DELETE FROM comments WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};

export const updateCommentDB = async (
  id: number,
  comment: string
): Promise<Comment> => {
  const { rows } = await query(
    "UPDATE comments SET content = $1 WHERE id = $2 RETURNING *",
    [comment, id]
  );
  return rows[0];
};
