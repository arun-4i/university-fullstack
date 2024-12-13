import { Request, Response } from "express";
import {
  getAllCoursesService,
  getSingleCourseService,
  createCourseService,
  deleteCourseService,
  updateCourseService,
} from "../services/course-service";

const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await getAllCoursesService();
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleCourse = async (req: Request, res: Response) => {
  try {
    const course = await getSingleCourseService(req.params.id);
    res.json(course);
  } catch (error: any) {
    if (error.message === "Course not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await createCourseService(req.body);
    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCourse = async (req: Request, res: Response) => {
  try {
    const result = await deleteCourseService(req.params.id);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Course not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateCourse = async (req: Request, res: Response) => {
  try {
    const result = await updateCourseService(req.params.id, req.body);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Professor not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export default {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
