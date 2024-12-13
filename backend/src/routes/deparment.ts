import { Router } from "express";
import departmentController from "../controller/department-controller";
import { authenticateToken } from "../utils/authMiddleWare";

export const departmentRouter = Router();

departmentRouter.get("/deptprofcourse/:id",authenticateToken, departmentController.getDepartmentProfessorCourses);
departmentRouter.get("/",authenticateToken, departmentController.getAllDepartments);
departmentRouter.get("/:id",authenticateToken, departmentController.getSingleDepartment);
departmentRouter.post("/",authenticateToken,departmentController.createDepartment);
departmentRouter.put("/:id",authenticateToken,departmentController.updateDepartment);
departmentRouter.delete("/:id",authenticateToken,departmentController.deleteDepartment);
