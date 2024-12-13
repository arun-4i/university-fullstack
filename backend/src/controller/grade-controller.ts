import { Request, Response } from "express";
import {
  getAllGradesService,
  getSingleGradeService,
  createGradeService,
  deleteGradeService,
  updateGradeService,
} from "../services/grade-service";

const getAllGrades = async (req: Request, res: Response) => {
  try {
    const grades = await getAllGradesService();
    res.json(grades);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const getSingleGrade = async (req: Request, res: Response) => {
  try {
    const grade = await getSingleGradeService(req.params.id);
    res.json(grade);
  } catch (error: any) {
    if (error.message === "Grade not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createGrade = async (req: Request, res: Response) => {
  try {
    const insertedData = await createGradeService(req.body);
    res.json({
      message: "Grades created successfully!",
      insertedData,
    });
  } catch (error: any) {
    if (error.message.includes("arrays of the same length") || 
        error.message.includes("not enrolled")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteGrade = async (req: Request, res: Response) => {
  try {
    const result = await deleteGradeService(req.params.id);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Grade not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateGrade = async (req: Request, res: Response) => {
  try {
    const result = await updateGradeService(req.params.id, req.body);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Grade not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export default {
  getAllGrades,
  getSingleGrade,
  createGrade,
  updateGrade,
  deleteGrade,
};
