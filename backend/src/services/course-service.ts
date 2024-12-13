import { Course } from "../model/course-model";
import { Professor } from "../model/professor-model";

export const getAllCoursesService = async () => {
  const courses = await Course.findAll({
    attributes: ["course_id", "course_name", "description"],
    include: [
      {
        model: Professor,
        attributes: ["first_name", "last_name"],
      },
    ],
    raw: true,
  });

  const formattedCourses = courses.map((course: any) => ({
    course_id: course.course_id,
    course_name: course.course_name,
    course_description: course.description,
    Prof_name: `${course["Professor.first_name"]} ${course["Professor.last_name"]}`,
  }));

  return formattedCourses;
};

export const getSingleCourseService = async (courseId: string) => {
  const course = await Course.findOne({
    attributes: ["course_name"],
    where: { course_id: courseId },
    include: [
      {
        model: Professor,
        attributes: ["first_name", "last_name"],
      },
    ],
  });

  if (!course) {
    throw new Error("Course not found");
  }

  return {
    course_name: course.dataValues.course_name,
    professor_name: `${course.dataValues.Professor.first_name} ${course.dataValues.Professor.last_name}`,
  };
};

export const createCourseService = async (courseData: {
  course_name: string;
  course_description: string;
  prof_name: string;
}) => {
  const { course_name, course_description, prof_name } = courseData;
  const [firstName, lastName] = prof_name.split(" ");

  const ProfessorDetails = await Professor.findOne({
    where: { first_name: firstName, last_name: lastName },
  });
    
  const prof_id = ProfessorDetails?.dataValues.professor_id;
  const course = await Course.create({
    course_name: course_name,
    description: course_description,
    professor_id: prof_id,
  });

  return course;
};

export const deleteCourseService = async (courseId: string) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  await course.destroy();
  return { message: "Course deleted successfully" };
};

export const updateCourseService = async (
  courseId: string,
  courseData: {
    course_description: string;
    course_name: string;
    prof_name: string;
  }
) => {
  const { course_description, course_name, prof_name } = courseData;
  const [firstName, lastName] = prof_name.split(" ");

  const ProfessorDetails = await Professor.findOne({
    where: { first_name: firstName, last_name: lastName },
  });

  const prof_id = ProfessorDetails?.dataValues.professor_id;

  await Course.update(
    {
      course_name: course_name,
      description: course_description,
      professor_id: prof_id,
    },
    {
      where: { course_id: courseId },
    }
  );

  return { message: "Course updated successfully" };
};
