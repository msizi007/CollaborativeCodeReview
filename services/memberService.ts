import { log } from "node:console";
import { query } from "../config/database";
import { User } from "../models/userModel";

export const selectAllMembers = async (projectId: number) => {
  const { rows } = await query("SELECT * FROM members where project_id = $1", [
    projectId,
  ]);
  return rows;
};

export const addMemberDB = async (userId: number, projectId: number) => {
  log(301, userId, projectId);
  const { rows } = await query(
    "INSERT INTO members (project_id, user_id) VALUES ($1, $2) RETURNING *",
    [projectId, userId]
  );
  return rows[0];
};

export const removeMemberDB = async (userId: number, projectId: number) => {
  const { rows } = await query(
    "DELETE FROM members WHERE project_id = $1 AND user_id = $2 RETURNING *",
    [projectId, userId]
  );
  return rows[0];
};
