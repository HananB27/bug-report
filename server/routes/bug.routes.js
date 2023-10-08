import express from "express";
import { getAllBugs, createBug, changeCompletedStatus, getBugsByUserId } from "../controllers/bug.controller.js";

const router = express.Router();

router.get("/", getAllBugs);

router.post('/', createBug);

router.put('/:id/completedStatus', changeCompletedStatus);

router.get('/:userId', getBugsByUserId)

export default router;
