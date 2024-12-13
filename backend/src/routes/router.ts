import { Router } from "express";
import { END_POINTS } from "../constants/end-points";
import { studentRouter } from "./student";
import { professorRouter } from "./professor";
import { gradeRouter } from "./grade";
import { departmentRouter } from "./deparment";
import { courseRouter } from "./course";
import { studentCourseRouter } from "./student-course";
import { userRouter } from "./user";

export const router = Router();

router.use(END_POINTS.STUDENT, studentRouter);
router.use(END_POINTS.PROFESSOR, professorRouter);
router.use(END_POINTS.GRADE, gradeRouter);
router.use(END_POINTS.DEPARTMENT, departmentRouter);
router.use(END_POINTS.COURSE, courseRouter);
router.use(END_POINTS.STUDENT_COURSE, studentCourseRouter);
router.use(END_POINTS.USER, userRouter);
