import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const getHomePageColumns = () => [
  columnHelper.accessor("course_name", {
    header: "Course Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("student_name", {
    header: "Student Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("highest_grade", {
    header: "Highest Grade",
    cell: (info) => info.getValue(),
  }),
];