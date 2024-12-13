import { Router } from "express";
import professorController from "../controller/professor-controller";
import { authenticateToken } from "../utils/authMiddleWare";

export const professorRouter = Router();

professorRouter.get("/profcoursestudent/:id",authenticateToken,professorController.getProfessorCourseStudent);
professorRouter.get("/", authenticateToken,professorController.getAllProfessors);
professorRouter.get("/:id",authenticateToken, professorController.getSingleProfessor);
professorRouter.post("/",authenticateToken, professorController.createProfessor);
professorRouter.put("/:id",authenticateToken,professorController.updateProfessor);
professorRouter.delete("/:id", authenticateToken,professorController.deleteProfessor);

