import express from "express";
import {
  getAllBugs,
  createBug,
  changeCompletedStatus,
  getBugsByUserId,
} from "../controllers/bug.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllBugs);

router.post("/", authMiddleware, createBug);

router.put("/:id/completedStatus", authMiddleware, changeCompletedStatus);

router.get("/:userId", authMiddleware, getBugsByUserId);

export default router;
