import { Router } from "express";
import gradeController from "../controller/grade-controller";
import { authenticateToken } from "../utils/authMiddleWare";

export const gradeRouter = Router();

gradeRouter.get("/", authenticateToken,gradeController.getAllGrades);
gradeRouter.get("/:id", authenticateToken, gradeController.getSingleGrade);
gradeRouter.post("/", authenticateToken, gradeController.createGrade);
gradeRouter.put("/:id", authenticateToken, gradeController.updateGrade);
gradeRouter.delete("/:id", authenticateToken, gradeController.deleteGrade);
