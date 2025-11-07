import Router from "express";
import { protect } from "../middleware/auth";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController";
import {
  addMember,
  getAllMembers,
  removeMember,
} from "../controllers/memberController";

const router = Router();
router.use(protect);

router.get("/", getAllProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProjectById);

router.get("/:id/members", getAllMembers);

// projects/pid/members - POST
router.post("/:id/members", addMember);
// projects/pid/members/uid - GET
router.delete("/:id/members/:uid", removeMember);

export default router;
