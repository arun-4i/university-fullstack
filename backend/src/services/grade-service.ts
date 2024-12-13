import { Grade } from "../model/grade-model";
import { studentCourse } from "../model/student-courses";

export const getAllGradesService = async () => {
  const grades = await Grade.findAll();
  return grades;
};

export const getSingleGradeService = async (gradeId: string) => {
  const grade = await Grade.findByPk(gradeId);
  if (!grade) {
    throw new Error("Grade not found");
  }
  return grade;
};

export const createGradeService = async (gradeData: {
  student_id: number;
  course_id: number[];
  grade: number[];
}) => {
  const { student_id, course_id, grade } = gradeData;

  if (!Array.isArray(course_id) || !Array.isArray(grade) || course_id.length !== grade.length) {
    throw new Error("course_id and grade must be arrays of the same length");
  }

  // Check enrollment for each course
  const enrollmentChecks = await Promise.all(
    course_id.map((courseId) =>
      studentCourse.findOne({
        where: {
          student_id: student_id,
          course_id: courseId,
        },
      })
    )
  );

  // Filter out any courses where the student is not enrolled
  const notEnrolledCourses = enrollmentChecks.filter((enrollment) => !enrollment);

  if (notEnrolledCourses.length > 0) {
    throw new Error("Student is not enrolled in one or more specified courses.");
  }

  // Create grades for enrolled courses
  const gradePromises = course_id.map((courseId, index) =>
    Grade.create({
      student_id: student_id,
      course_id: courseId,
      grade: grade[index],
    })
  );

  // Execute all grade creation promises
  const insertedData = await Promise.all(gradePromises);
  return insertedData;
};

export const deleteGradeService = async (gradeId: string) => {
  const grade = await Grade.findByPk(gradeId);
  if (!grade) {
    throw new Error("Grade not found");
  }
  await grade.destroy();
  return { message: "Grade deleted successfully" };
};

export const updateGradeService = async (
  gradeId: string,
  gradeData: Partial<typeof Grade>
) => {
  const grade = await Grade.findByPk(gradeId);
  if (!grade) {
    throw new Error("Grade not found");
  }

  const updatedGrade = await Grade.update(gradeData, {
    where: { grade_id: gradeId },
  });

  return {
    message: "Grade updated successfully",
    updatedGrade: updatedGrade,
  };
};
