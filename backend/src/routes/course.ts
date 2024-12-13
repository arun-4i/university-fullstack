import { Router } from "express";
import courseController from "../controller/course-controller";
import { authenticateToken } from "../utils/authMiddleWare";

export const courseRouter = Router();

courseRouter.get("/", authenticateToken, courseController.getAllCourses);
courseRouter.get("/:id",authenticateToken, courseController.getSingleCourse);
courseRouter.post("/",authenticateToken, courseController.createCourse);
courseRouter.put("/:id", authenticateToken,courseController.updateCourse);
courseRouter.delete("/:id", authenticateToken, courseController.deleteCourse);