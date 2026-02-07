import express from "express";
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from "../controllers/projectController.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// Public route
router.get("/", getProjects);

// Protected routes
router.get("/:id", getProjectById);
router.post("/", protect, allowRoles("admin"), createProject);
router.put("/:id", protect, allowRoles("admin"), updateProject);
router.delete("/:id", protect, allowRoles("admin"), deleteProject);

export default router;