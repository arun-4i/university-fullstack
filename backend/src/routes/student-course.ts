import { Router } from "express";
import studentCourseController from "../controller/student-courses-controller";
import { authenticateToken } from "../utils/authMiddleWare";

export const studentCourseRouter = Router();

studentCourseRouter.get("/", authenticateToken, studentCourseController.getAllStudentCourses);
studentCourseRouter.get("/:id",authenticateToken,studentCourseController.getStudentCourse);
studentCourseRouter.post("/", authenticateToken, studentCourseController.createStudentCourse);
studentCourseRouter.put("/:studentId/:courseId",authenticateToken,studentCourseController.updateStudentCourse);
studentCourseRouter.delete("/:studentId/:courseId",authenticateToken, studentCourseController.deleteStudentCourse);
