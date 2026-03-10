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
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  console.log({ authHeader });
  try {
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      console.log({ token });

      if (!token) {
        return res.status(401).json({ message: "Token missing from header" });
      }

      console.log({
        token,
        envToken: process.env.JWT_SECRET?.trim() as string,
      });
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      console.log({ decoded });

      const user = await selectUserByEmail(decoded.email);
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      return next();
    } else {
      return res.status(403).json({ message: "No authorization header found" });
    }
  } catch (error) {
    // This catches "jwt malformed", "jwt expired", etc.
    return res.status(401).json({ message: "Invalid or malformed token" });
  }
};
