import { Request, Response } from "express";
import {
  getAllProfessorsService,
  getSingleProfessorService,
  createProfessorService,
  deleteProfessorService,
  updateProfessorService,
  getProfessorCourseStudentService,
} from "../services/professor-service";

const getAllProfessors = async (req: Request, res: Response) => {
  try {
    const professors = await getAllProfessorsService();
    res.json(professors);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const getSingleProfessor = async (req: Request, res: Response) => {
  try {
    const professor = await getSingleProfessorService(req.params.id);
    res.json(professor);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const createProfessor = async (req: Request, res: Response) => {
  try {
    const professor = await createProfessorService(req.body);
    res.status(201).json(professor);
  } catch (error: any) {
    if (error.message === "Professor already exists.") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteProfessor = async (req: Request, res: Response) => {
  try {
    const result = await deleteProfessorService(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const updateProfessor = async (req: Request, res: Response) => {
  try {
    const result = await updateProfessorService(req.params.id, req.body);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Professor already exists.") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(404).json({ error: error.message });
    }
  }
};

const getProfessorCourseStudent = async (req: Request, res: Response) => {
  try {
    const professor = await getProfessorCourseStudentService(req.params.id);
    res.json(professor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllProfessors,
  getSingleProfessor,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getProfessorCourseStudent,
};
