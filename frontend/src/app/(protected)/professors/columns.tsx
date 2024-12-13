import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

const columnHelper = createColumnHelper();

export const getProfessorColumns = (onUpdate, onDelete) => [
  columnHelper.accessor("first_name", {
    header: "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_name", {
    header: "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Department.department_name", {
    header: "Department Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="space-x-2 flex">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdate(row.original)}
        >
          <Pencil />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(row.original)}
        >
          <Trash />
        </Button>
      </div>
    ),
  }),
];
