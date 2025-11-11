import { Request, Response } from "express";
import {
  deleteCommentDB,
  insertComment,
  selectAllComments,
  selectCommentById,
  updateCommentDB,
} from "../services/commentService";
import { Comment } from "../models/commentModel";
import { selectProjectByIdDB } from "../services/projectService";
import { log } from "node:console";
import { selectSubmissionById } from "../services/submissionService";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await selectAllComments(Number(id));
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { cid, sid } = req.params;

    const submission = await selectSubmissionById(Number(sid));

    if (!submission || submission.id !== Number(sid)) {
      return res.status(404).json({ message: "Project not found" });
    }

    const comment = await selectCommentById(Number(cid));
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = req.body as Comment;
    const { id } = req.params;
    log(101, comment, id);
    const newComment = await insertComment(comment.content, Number(id));
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedComment = await deleteCommentDB(Number(id));
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = req.body as Comment;
    const updatedComment = await updateCommentDB(Number(id), comment.content);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json(error);
  }
};
