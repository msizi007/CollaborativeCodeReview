import { Router } from "express";
import {
  createSubmission,
  deleteSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
} from "../controllers/submissionController";
import {
  createComment,
  getAllComments,
  getCommentById,
} from "../controllers/commentController";

const router = Router();

router.get("/", getAllSubmissions);
router.post("/", createSubmission);
router.get("/:id", getSubmissionById);
router.patch("/:id/status", updateSubmission);
router.delete("/:id", deleteSubmission);

router.get("/:id/comments", getAllComments);
router.get("/:pid/comments/:cid", getCommentById);
router.post("/:id/comments", createComment);

export default router;
