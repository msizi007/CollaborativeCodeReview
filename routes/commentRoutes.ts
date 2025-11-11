import { Router } from "express";
import { deleteComment, updateComment } from "../controllers/commentController";

const router = Router();

router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
