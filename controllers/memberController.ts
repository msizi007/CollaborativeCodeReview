import { Request, Response } from "express";
import {
  addMemberDB,
  removeMemberDB,
  selectAllMembers,
} from "../services/memberService";
import { selectUserById } from "../services/userServices";
import { User } from "../models/userModel";
import { getAllProjects } from "./projectController";
import { log } from "node:console";

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const members = await selectAllMembers(projectId);
    res.status(200).json(members);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const user = req.body as User;
    log(201, projectId, user);

    // if usera data not found
    if (!user) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const member = await selectUserById(user.id!);

    // if user not found in db
    if (!member) {
      return res.status(400).json({ message: "Member is not a valid user" });
    }

    const newMember = await addMemberDB(member.id, projectId);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const userId = parseInt(req.params.uid);
    const deletedMember = await removeMemberDB(userId, projectId);
    res.status(200).json(deletedMember);
  } catch (error) {
    res.status(400).json(error);
  }
};
