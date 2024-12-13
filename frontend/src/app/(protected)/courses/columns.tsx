import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { Pencil, Trash, Eye } from "lucide-react";
import Link from "next/link";

const columnHelper = createColumnHelper();

export const getCourseColumns = (onUpdate, onDelete) => [
  columnHelper.accessor("course_name", {
    header: "Course Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("course_description", {
    header: "Course Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Prof_name", {
    header: "Professor Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: any }) => (
      <div className="space-x-2 flex">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdate(row.original)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(row.original)}
        >
          <Trash className="h-4 w-4" />
        </Button>
        <Link href={`/courses/${row.original!.course_id}`}>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    ),
  }),
];
