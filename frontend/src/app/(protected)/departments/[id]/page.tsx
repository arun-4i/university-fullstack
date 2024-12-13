"use client";

import { axiosInstance } from "@/api/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"; // Ensure the correct path
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react"; 
import { T_DEPARTMENT } from "@/types/student";
import CreateOrUpdateModal from "@/components/department/create-update-modal";
import DeleteModal from "@/components/department/delete-modal";
import { useRouter } from "next/navigation";
import { ApiError } from "@/types/error";


interface Course {
  course_id: number;
  course_name: string;
}

interface Professor {
  professor_id: number;
  first_name: string;
  last_name: string;
  Courses: Course[];
}

interface DepartmentData {
  department_id: string;
  department_name: string;
  Professors: Professor[];
}

const DeptProfCourse = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();
  const [data, setData] = useState<DepartmentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<T_DEPARTMENT | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/department/deptprofcourse/${id}`
      );
      setData(response.data);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.error || "Failed to fetch departments data");
      console.error("Error fetching departments data", apiError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    if (data) {
      setSelectedDepartment({
        department_id: data.department_id,
        department_name: data.department_name,
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = () => {
    if (data) {
      setSelectedDepartment({
        department_id: data.department_id,
        department_name: data.department_name,
      });
      setIsDeleteOpen(true);
    }
  };

  const handleDepartmentSubmit = async (
    departmentData: Omit<T_DEPARTMENT, "department_id">
  ) => {
    try {
      await axiosInstance.put(
        `/department/${data?.department_id}`,
        departmentData
      );
      toast.success("Department updated successfully!");
      setIsModalOpen(false);
      fetchData();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.error || "Failed to update department");
      console.error("Error updating Department", apiError);
    }
  };

  const handleDepartmentDelete = async (department: T_DEPARTMENT) => {
    try {
      await axiosInstance.delete(`/department/${department.department_id}`);
      toast.success("Department deleted successfully!");
      setIsDeleteOpen(false);
      router.push('/departments');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.error || "Failed to delete department");
      console.error("Error deleting Department", apiError);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {data?.department_name}
        </h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleEdit}
          >
            <Pencil className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
          >
            <Trash className="w-6 h-6" />
          </Button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.Professors.map((professor) => (
            <Card key={professor.professor_id}>
              <CardHeader>
                <CardTitle className="text-lg">Prof</CardTitle>
                <CardDescription className="text-lg">
                  {`${professor.first_name} ${professor.last_name}`}
                </CardDescription>
              </CardHeader>
              <Separator />

              <CardContent className="mt-4">
                {/* <p className='text-2xl'>Courses:</p> */}
                <ul className="text-md mt-4">
                  {professor.Courses.map((course) => (
                    <li className="mb-2 font-semibold" key={course.course_id}>
                      {course.course_name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <CreateOrUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDepartmentSubmit}
        department={selectedDepartment}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        department={selectedDepartment}
        onDelete={handleDepartmentDelete}
      />
    </div>
  );
};

export default DeptProfCourse;
