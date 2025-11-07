import { Request, Response } from "express";
import { Submission } from "../models/submissionModel";
import {
  createSubmissionDB,
  deleteSubmissionDB,
  selectAllSubmissions,
  selectSubmissionById,
  updateSubmissionDB,
} from "../services/submissionService";

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const submission = req.body as Submission;
    const newSubmission = await createSubmissionDB(submission);
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await selectAllSubmissions();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const status = req.params.status;
    const submission = await updateSubmissionDB(Number(id), status);
    res.status(200).json(submission);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedSubmission = await updateSubmissionDB(Number(id), status);
    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSubmission = await deleteSubmissionDB(Number(id));
    res.status(200).json(deletedSubmission);
  } catch (error) {
    res.status(400).json(error);
  }
};
