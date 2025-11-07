import { log } from "node:console";
import { query } from "../config/database";
import { User } from "../models/userModel";

export const selectAllUsers = async () => {
  const { rows } = await query("SELECT * FROM users", []);
  return rows;
};

export const selectUserById = async (id: number) => {
  const { rows } = await query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

export const selectUserByEmail = async (email: string) => {
  const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
};

export const insertUserDB = async (user: User) => {
  const { rows } = await query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [user.username, user.email, user.password]
  );
  return rows[0];
};

export const loginUserDB = async (email: string, password: string) => {
  const { rows } = await query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );
  return rows[0];
};

// update
export const updateUserDB = async (id: number, user: User) => {
  const { rows } = await query(
    "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
    [user.username, user.email, user.password, id]
  );
  return rows[0];
};

// delete
export const deleteUserDB = async (id: number) => {
  const { rows } = await query("DELETE FROM users WHERE id = $1 RETURNING *", [
    id,
  ]);
  return rows[0];
};
