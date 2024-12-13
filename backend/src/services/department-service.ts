import { Department } from "../model/department-model";
import { Professor } from "../model/professor-model";
import { Course } from "../model/course-model";

export const getAllDepartmentsService = async () => {
  const departments = await Department.findAll({
    attributes: ["department_id", "department_name"],
  });
  return departments;
};

export const getSingleDepartmentService = async (departmentId: string) => {
  const department = await Department.findByPk(departmentId);
  if (!department) {
    throw new Error("Department not found");
  }
  return department;
};

export const createDepartmentService = async (departmentData: {
  department_name: string;
}) => {
  const isExistingDept = await Department.findOne({
    where: { department_name: departmentData.department_name },
  });

  if (isExistingDept) {
    throw new Error("Department already exists.");
  }

  const department = await Department.create(departmentData);
  return department;
};

export const deleteDepartmentService = async (departmentId: string) => {
  const department = await Department.findByPk(departmentId);
  if (!department) {
    throw new Error("Department not found");
  }
  await department.destroy();
  return { message: "Department deleted successfully" };
};

export const updateDepartmentService = async (departmentId: string, departmentData: { department_name: string }) => {
  console.log("----data---", departmentData.department_name);
  const department = await Department.findOne({
    where: { department_name: departmentData.department_name },
  });
  if(!department){
    try {
      await Department.update(departmentData, {
        where: { department_id: departmentId },
      });
      return { message: "Department updated successfully" };
    } catch (error: any) {
      throw new Error("Error updating Department");
    }
  }
  throw new Error("Department already exists.");
};

export const getDepartmentProfessorCoursesService = async (
  departmentId: string
) => {
  const department = await Department.findOne({
    where: { department_id: departmentId },
    attributes: ["department_id", "department_name"],
    include: [
      {
        model: Professor,
        attributes: ["professor_id", "first_name", "last_name"],
        include: [
          {
            model: Course,
            attributes: ["course_id", "course_name"],
          },
        ],
      },
    ],
  });

  if (!department) {
    throw new Error("Department not found");
  }

  return department;
};
