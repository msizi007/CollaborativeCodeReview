import { log } from "console";
import { query } from "../config/database";
import { Project } from "../models/projectModel";

export const selectAllProjects = async () => {
  const { rows } = await query("SELECT * FROM projects", []);
  return rows;
};
export const selectProjectByIdDB = async (id: number) => {
  const { rows } = await query("SELECT * FROM projects WHERE id = $1", [id]);
  return rows[0];
};

export const insertIntoProjects = async (project: Project) => {
  log(103, project);
  const { rows } = await query(
    "INSERT INTO projects (title, description) VALUES ($1, $2) RETURNING *",
    [project.title, project.description]
  );
  return rows[0];
};

export const updateProjectDB = async (id: number, project: Project) => {
  const { rows } = await query(
    "UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *",
    [project.title, project.description, id]
  );
  return rows[0];
};

export const deleteProjectDB = async (id: number) => {
  const { rows } = await query(
    "DELETE FROM projects WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};
