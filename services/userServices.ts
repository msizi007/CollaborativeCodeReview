import { query } from "../config/database";
import { User } from "../models/userModel";

export const selectAllUsers = async () => {
  const { rows } = await query("SELECT * FROM users", []);
  return rows;
};

export const insertUser = async (user: User) => {
  const { rows } = await query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [user.username, user.email, user.password]
  );
  return rows[0];
};
