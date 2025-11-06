import { Request, Response } from "express";
import { selectAllUsers } from "../services/userServices";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await selectAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};
