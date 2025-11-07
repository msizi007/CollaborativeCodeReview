import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { selectUserByEmail, selectUserById } from "../services/userServices";
import { User } from "../models/userModel";
import { log } from "console";

export interface JwtPayload {
  id?: number;
  email: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user: User | null = await selectUserByEmail(decoded.email);

    // if user not found
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user || undefined;
    return next();
  } else {
    res.status(403).json({ message: "Not authorized" });
    return next();
  }
};
