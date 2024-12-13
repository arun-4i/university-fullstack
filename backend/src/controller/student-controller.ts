import { Request, Response } from "express";
import {
  getAllStudentsService,
  getSingleStudentService,
  createStudentService,
  deleteStudentService,
  updateStudentService,
  getStudentGradesService,
  getCustomHomeService,
} from "../services/student-service";

// Get all students
const getAllStudents = async (req: Request, res: Response) => {
  // console.log("request: ", req.headers.authorization);
  try {
    const students = await getAllStudentsService();
    res.json(students);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Get a single student by ID
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const student = await getSingleStudentService(req.params.id);
    res.json(student);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new student
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await createStudentService(req.body);
    res.status(201).json(student);
  } catch (error: any) {
    if (error.message === "Student already exists.") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Delete a student by ID
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await deleteStudentService(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Update a student by ID
const updateStudent = async (req: Request, res: Response) => {
  try {
    const result = await updateStudentService(req.params.id, req.body);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Student already exists.") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(404).json({ error: error.message });
    }
  }
};

// Get student's grades
const getStudentGrades = async (req: Request, res: Response) => {
  try {
    const student = await getStudentGradesService(req.params.id);
    res.json(student);
  } catch (error: any) {
    if (error.message === "Student not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const customHome = async(req: Request, res: Response) => {
  try {
    const customData = await getCustomHomeService();
    res.json(customData);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
export default {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentGrades,
  customHome,
};
