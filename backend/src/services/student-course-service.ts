import { Student } from "../model/student-model";
import { Course } from "../model/course-model";
import { studentCourse } from "../model/student-courses";
import { Department } from "../model/department-model";

export const getStudentCourseService = async (courseId: string) => {
  const enrolledStudents = await studentCourse.findAll({
    where: { course_id: courseId },
    include: [
      {
        model: Student,
        attributes: ["first_name", "last_name", "email", "dob"],
        include: [
          {
            model: Department,
            attributes: ["department_name"],
          },
        ],
      },
    ],
  });

  const formattedResponse = enrolledStudents.map((enrollment: any) => ({
    student_id: enrollment.Student.student_id,
    first_name: enrollment.Student.first_name,
    last_name: enrollment.Student.last_name,
    email: enrollment.Student.email,
    dob: enrollment.Student.dob,
    department_id: enrollment.Student.department_id,
    createdAt: enrollment.Student.createdAt,
    updatedAt: enrollment.Student.updatedAt,
    Department: {
      department_name: enrollment.Student.Department.department_name,
    },
  }));

  return formattedResponse;
};

export const getAllStudentCoursesService = async () => {
  const studentCourses = await studentCourse.findAndCountAll({
    attributes: [],
    include: [
      {
        model: Student,
        attributes: ["first_name", "last_name"],
      },
      {
        model: Course,
        attributes: ["course_name"],
      },
    ],
  });
  return studentCourses;
};

export const createStudentCourseService = async (data: {
  student_id: number;
  course_id: number;
}) => {
  const { student_id, course_id } = data;

  const isStudentExists = await Student.findByPk(student_id);
  const isCourseExists = await Course.findByPk(course_id);

  if (!isStudentExists) {
    throw new Error("Student not found");
  }
  if (!isCourseExists) {
    throw new Error("Course not found");
  }

  const studentCourseRecord = await studentCourse.create({
    student_id,
    course_id,
  });

  return studentCourseRecord;
};

export const deleteStudentCourseService = async (
  studentId: string,
  courseId: string
) => {
  const studentCourseRecord = await studentCourse.findOne({
    where: {
      student_id: studentId,
      course_id: courseId,
    },
  });

  if (!studentCourseRecord) {
    throw new Error("Student-Course record not found");
  }

  await studentCourseRecord.destroy();
  return { message: "Student's Specific Course record deleted successfully" };
};

export const updateStudentCourseService = async (
  studentId: string,
  courseId: string,
  newCourseId: string
) => {
  const existingRecord = await studentCourse.findOne({
    where: {
      student_id: studentId,
      course_id: newCourseId,
    },
  });

  if (existingRecord) {
    throw new Error("This student is already enrolled in the specified course.");
  }

  const [updateCount] = await studentCourse.update(
    { course_id: newCourseId },
    {
      where: {
        student_id: studentId,
        course_id: courseId,
      },
      silent: false,
    }
  );

  if (updateCount === 0) {
    throw new Error("Student-Course record not found");
  }

  return {
    message: "Student's Specific Course record updated successfully",
    updatedRows: updateCount,
  };
};
