import { Request, Response } from "express";
import {
  deleteProjectDB,
  insertIntoProjects,
  selectAllProjects,
  selectProjectByIdDB,
  updateProjectDB,
} from "../services/projectService";
import { Project } from "../models/projectModel";
import { log } from "console";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await selectAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await selectProjectByIdDB(Number(id));
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = req.body as Project;
    log(101, project);
    const newProject = await insertIntoProjects(project);
    log(102, newProject);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = req.body as Project;
    const updatedProject = await updateProjectDB(Number(id), project);
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProject = await deleteProjectDB(Number(id));
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(400).json(error);
  }
};
