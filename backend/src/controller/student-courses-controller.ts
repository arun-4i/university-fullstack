import { Request, Response } from "express";
import {
  getAllStudentCoursesService,
  getStudentCourseService,
  createStudentCourseService,
  deleteStudentCourseService,
  updateStudentCourseService,
} from "../services/student-course-service";

const getStudentCourse = async (req: Request, res: Response) => {
  try {
    const students = await getStudentCourseService(req.params.id);
    res.json(students);
  } catch (error: any) {
    console.error("Error in getStudentCourse:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllStudentCourses = async (req: Request, res: Response) => {
  try {
    const studentCourses = await getAllStudentCoursesService();
    res.json(studentCourses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createStudentCourse = async (req: Request, res: Response) => {
  try {
    const studentCourseRecord = await createStudentCourseService(req.body);
    res.status(201).json(studentCourseRecord);
  } catch (error: any) {
    if (error.message.includes("not found")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const deleteStudentCourse = async (req: Request, res: Response) => {
  try {
    const result = await deleteStudentCourseService(
      req.params.studentId,
      req.params.courseId
    );
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Student-Course record not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateStudentCourse = async (req: Request, res: Response) => {
  try {
    const result = await updateStudentCourseService(
      req.params.studentId,
      req.params.courseId,
      req.body.new_course_id
    );
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message.includes("already enrolled")) {
      res.status(400).json({ error: error.message });
    } else if (error.message === "Student-Course record not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export default {
  getAllStudentCourses,
  getStudentCourse,
  createStudentCourse,
  deleteStudentCourse,
  updateStudentCourse,
};
