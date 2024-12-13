import { T_DEPARTMENT } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type DeptCardsProps = {
  departments: T_DEPARTMENT[];
};

const DeptCards = ({ departments}: DeptCardsProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {departments.map((department) => (
        <Link
          key={department.department_id}
           href={`/departments/${department.department_id}`}
        >
          <Card className="h-full shadow-md">
            <CardHeader className="h-full flex justify-center items-center">
              <CardTitle>{department.department_name}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(department)} // Trigger the edit handler
              >
                <Pencil className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(department)} // Trigger the delete handler
              >
                <Trash className="w-6 h-6" />
              </Button>
              <Link href={`/departments/${department.department_id}`}>
                <Button variant="outline" size="icon">
                  <Eye className="w-6 h-6" />
                </Button>
              </Link>
            </div> */}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default DeptCards;
