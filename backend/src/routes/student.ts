import { Router } from "express";
import studentController from "../controller/student-controller";
import { authenticateToken } from "../utils/authMiddleWare";

export const studentRouter = Router();

studentRouter.get("/student-grade/:id", authenticateToken, studentController.getStudentGrades)
studentRouter.get("/",authenticateToken, studentController.getAllStudents);
// studentRouter.get("/:id", studentController.getSingleStudent);
studentRouter.post("/", authenticateToken, studentController.createStudent);
studentRouter.put("/:id",authenticateToken,  studentController.updateStudent);
studentRouter.delete("/:id", authenticateToken, studentController.deleteStudent);
studentRouter.get("/customhome",authenticateToken, studentController.customHome);
