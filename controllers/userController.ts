require("dotenv").config();
import { Request, Response } from "express";
import {
  deleteUserDB,
  insertUserDB,
  loginUserDB,
  selectAllUsers,
  selectUserByEmail,
  selectUserById,
  updateUserDB,
} from "../services/userServices";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await selectAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await selectUserById(Number(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.body as User;
    const updatedUser = await updateUserDB(Number(id), user);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserDB(Number(id));
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};
