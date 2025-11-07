import { Router } from "express";
import {
  createSubmission,
  deleteSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
} from "../controllers/submissionController";

const router = Router();

router.get("/", getAllSubmissions);
router.post("/", createSubmission);
router.get("/:id", getSubmissionById);
router.patch("/:id/status", updateSubmission);
router.delete("/:id", deleteSubmission);

export default router;
