import { z } from "zod";

export const StudentSchema = z.object({
  student_id: z.number().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (date) => {
        const inputDate = new Date(date);
        const today = new Date();
        return inputDate < today; // Ensure date is less than today
      },
      { message: "Date of birth must be less than today's date." }
    ),
  department_name: z.string().min(1, "Department name is required"), // Ensures department_name is required
});

export type T_STUDENT = z.infer<typeof StudentSchema>;

// Schema for Department
export const DepartmentSchema = z.object({
  department_id:z.string(),
  department_name: z.string().min(1, "Department name is required"),
});

export type T_DEPARTMENT = z.infer<typeof DepartmentSchema>;


// Schema for Professor
export const ProfessorSchema = z.object({
  professor_id: z.number().optional(), // Optional if auto-incremented
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  department_name: z.string(), 
});

export type T_PROFESSOR = z.infer<typeof ProfessorSchema>;

export const CourseSchema = z.object({
  course_id: z.number().optional(), // Optional if auto-incremented
  course_description: z.string().min(3, "Course description is required"),
  course_name: z.string().min(1, "Course name is required"),
  prof_name: z.string().min(1, "Professor name is required"),
});

export type T_COURSE = z.infer<typeof CourseSchema>;


