import { Request, Response } from "express";
import {
  getAllDepartmentsService,
  getSingleDepartmentService,
  createDepartmentService,
  deleteDepartmentService,
  updateDepartmentService,
  getDepartmentProfessorCoursesService,
} from "../services/department-service";

const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await getAllDepartmentsService();
    res.json(departments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleDepartment = async (req: Request, res: Response) => {
  try {
    const department = await getSingleDepartmentService(req.params.id);
    res.json(department);
  } catch (error: any) {
    if (error.message === "Department not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await createDepartmentService(req.body);
    res.status(201).json(department);
  } catch (error: any) {
    if (error.message === "Department already exists.") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const result = await deleteDepartmentService(req.params.id);
    res.json(result);
  } catch (error: any) {
    if (error.message === "Department not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateDepartment = async (req: Request, res: Response) => {
  try {
    const result = await updateDepartmentService(req.params.id, req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getDepartmentProfessorCourses = async (req: Request, res: Response) => {
  try {
    const department = await getDepartmentProfessorCoursesService(
      req.params.id
    );
    res.json(department);
  } catch (error: any) {
    if (error.message === "Department not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export default {
  getAllDepartments,
  getSingleDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentProfessorCourses,
};
