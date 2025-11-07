require("dotenv").config();
import { Request, Response } from "express";
import { insertUserDB, selectUserByEmail } from "../services/userServices";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { log } from "console";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    log(email, password);

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await selectUserByEmail(email);

    if (!user) return res.status(400).json({ message: "User not found" });

    log(103, user.password, password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    log(isPasswordValid);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ user, token }); // ✅ return once
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
};

export const register = async (req: Request<{}, {}, User>, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await insertUserDB({
      username,
      email,
      password: hashPassword,
    } as User);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
