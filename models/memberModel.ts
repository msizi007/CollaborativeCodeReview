import { query } from "../config/database";

export interface Member {
  user_id: number;
  project_id: number;
}

export const CREATE_MEMBERS_QUERY =
  "CREATE TABLE IF NOT EXISTS members (id serial primary key, user_id int, project_id int, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE)";

export const createMembersTable = async () => {
  await query(CREATE_MEMBERS_QUERY, []);
};
