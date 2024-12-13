// services/studentService.ts

import { Department } from "../model/department-model";
import { Student } from "../model/student-model";
import { Course } from "../model/course-model";
import { Grade } from "../model/grade-model";
import { Professor } from "../model/professor-model";
import sequelize from "sequelize";

// Get all students service
export const getAllStudentsService = async () => {
  const students = await Student.findAll({
    include: [
      {
        model: Department,
        attributes: ["department_name"],
      },
    ],
  });
  return students;
};

// Get single student service
export const getSingleStudentService = async (studentId: string) => {
  const student = await Student.findByPk(studentId);
  if (!student) {
    throw new Error("Student not found");
  }
  return student;
};

// Create student service (existing)
export const createStudentService = async (studentData: {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  department_name: string;
}) => {
  const { first_name, last_name, email, dob, department_name } = studentData;

  const tempDepartment = await Department.findOne({
    where: { department_name },
  });

  const department_id = tempDepartment?.dataValues.department_id;
  const existingStudent = await Student.findOne({ where: { email } });

  if (existingStudent) {
    throw new Error("Student already exists.");
  }

  const student = await Student.create({
    first_name,
    last_name,
    email,
    dob,
    department_id,
  });

  return student;
};

// Delete student service
export const deleteStudentService = async (studentId: string) => {
  const student = await Student.findByPk(studentId);
  if (!student) {
    throw new Error("Student not found");
  }
  await student.destroy();
  return { message: "Student deleted successfully" };
};

// Update student service
export const updateStudentService = async (
  studentId: string,
  studentData: {
    first_name: string;
    last_name: string;
    email: string;
    dob: string;
    department_name: string;
  }
) => {
  const { first_name, last_name, email, dob, department_name } = studentData;

  const tempDepartment = await Department.findOne({
    where: { department_name },
  });
  const department_id = tempDepartment?.dataValues?.department_id;
  try {
    await Student.update(
      {
        first_name,
        last_name,
        email,
        dob,
        department_id,
      },
      {
        where: { student_id: studentId },
      }
    );

    return { message: "Student updated successfully" };
  } catch (error: any) {
    throw new Error("Student already exists.");
  }
};

// Get student grades service
export const getStudentGradesService = async (studentId: string) => {
  const isValidStudent = await Student.findOne({
    where: { student_id: studentId },
  });

  if (!isValidStudent) {
    throw new Error("Student not found");
  }

  const student = await Student.findOne({
    where: { student_id: studentId },
    attributes: ["student_id", "first_name", "last_name"],
    include: [
      {
        model: Department,
        attributes: ["department_name"],
      },
      {
        model: Course,
        attributes: ["course_id", "course_name"],
        through: {
          attributes: [],
        },
        include: [
          {
            model: Grade,
            attributes: ["grade"],
            where: {
              student_id: studentId,
            },
            required: false,
          },
        ],
      },
    ],
  });

  return student;
};

export const getCustomHomeService = async () => {
  const studentData = await Student.findAndCountAll({});
  const studentCount = studentData.count;
  const professorData = await Professor.findAndCountAll({});
  const professorCount = professorData.count;
  const courseData = await Course.findAndCountAll({});
  const courseCount = courseData.count;
  const departmentData = await Department.findAndCountAll({});
  const departmentCount = departmentData.count;
      const gradePriority = {
        S: 5,
        A: 4,
        B: 3,
        C: 2,
        D: 1,
      };

      const highestGrades = await Grade.findAll({
        attributes: [
          [sequelize.col("Course.course_name"), "course_name"],
          [
            sequelize.fn(
              "CONCAT",
              sequelize.col("Student.first_name"),
              " ",
              sequelize.col("Student.last_name")
            ),
            "student_name",
          ],
          [sequelize.col("Grade.grade"), "highest_grade"],
        ],
        include: [
          {
            model: Course,
            attributes: [],
          },
          {
            model: Student,
            attributes: [],
          },
        ],
        where: {
          "$Grade.grade$": {
            [sequelize.Op.eq]: sequelize.literal(`
            (SELECT g.grade
             FROM Grades AS g
             WHERE g.course_id = Grade.course_id
             ORDER BY FIELD(g.grade, 'S', 'A', 'B', 'C', 'D') DESC
             LIMIT 1)
          `),
          },
        },
        group: [
          "Grade.grade_id",
          "Course.course_name",
          "Student.first_name",
          "Student.last_name",
        ],
        raw: true,
      });


  return { studentCount, professorCount, courseCount, departmentCount, highestGrades };
};
