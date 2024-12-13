import { Professor } from "../model/professor-model";
import { Course } from "../model/course-model";
import { Student } from "../model/student-model";
import { Department } from "../model/department-model";

export const getAllProfessorsService = async () => {
  const professors = await Professor.findAll({
    include: {
      model: Department,
      attributes: ["department_name"],
    },
  });
  return professors;
};

export const getSingleProfessorService = async (professorId: string) => {
  const professor = await Professor.findByPk(professorId);
  if (!professor) {
    throw new Error("Professor not found");
  }
  return professor;
};

export const createProfessorService = async (professorData: {
  first_name: string;
  last_name: string;
  email: string;
  department_name: string;
}) => {
  const { first_name, last_name, email, department_name } = professorData;
  
  const tempDepartment = await Department.findOne({
    where: { department_name },
  });
  const department_id = tempDepartment?.dataValues?.department_id;
  
  const existingProfessor = await Professor.findOne({ where: { email } });
  if (existingProfessor) {
    throw new Error("Professor already exists.");
  }

  const professor = await Professor.create({
    first_name,
    last_name,
    email,
    department_id,
  });
  return professor;
};

export const deleteProfessorService = async (professorId: string) => {
  const professor = await Professor.findByPk(professorId);
  if (!professor) {
    throw new Error("Professor not found");
  }
  await professor.destroy();
  return { message: "Professor deleted successfully" };
};

export const updateProfessorService = async (
  professorId: string,
  professorData: {
    first_name: string;
    last_name: string;
    email: string;
    department_name: string;
  }
) => {
  const { first_name, last_name, email, department_name } = professorData;

  const tempDepartment = await Department.findOne({
    where: { department_name },
  });
  const department_id = tempDepartment?.dataValues?.department_id;
try {
   await Professor.update(
     {
       first_name,
       last_name,
       email,
       department_id,
     },
     {
       where: { professor_id: professorId },
     }
   );
   return { message: "Professor updated successfully" };
} catch (error:any) {
  throw new Error("Professor already exists");
}
 
};

export const getProfessorCourseStudentService = async (professorId: string) => {
  const professor = await Professor.findOne({
    where: { professor_id: professorId },
    attributes: ["professor_id", "first_name", "last_name"],
    include: [
      {
        model: Course,
        attributes: ["course_id", "course_name"],
        include: [
          {
            model: Student,
            through: { attributes: [] },
            attributes: ["student_id", "first_name", "last_name"],
          },
        ],
      },
    ],
  });
  return professor;
};