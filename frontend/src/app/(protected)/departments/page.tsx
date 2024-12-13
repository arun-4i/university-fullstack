"use client";
import { axiosInstance } from "@/api/axios";
import DeptCards from "@/components/department/dept-cards";
import { Button } from "@/components/ui/button";
import { T_DEPARTMENT } from "@/types/student";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CreateOrUpdateModal from "@/components/department/create-update-modal";
import { ApiError } from "@/types/error";

const Departments = () => {
  const [data, setData] = useState<T_DEPARTMENT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<T_DEPARTMENT | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/department");
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

  const handleCreateUpdate = (department: T_DEPARTMENT | null) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleDepartmentSubmit = async (
    departmentData: Omit<T_DEPARTMENT, "department_id">
  ) => {
    if (selectedDepartment) {
      try {
        await axiosInstance.put(
          `/department/${selectedDepartment.department_id}`,
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
    } else {
      try {
        await axiosInstance.post("/department", departmentData);
        toast.success("Department created successfully!");
        setIsModalOpen(false);
        fetchData();
      } catch (error: unknown) {
        const apiError = error as ApiError;
        toast.error(apiError.response?.data?.error || "Failed to create department");
        console.error("Error creating Department", apiError);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Departments List</h1>
        <Button onClick={() => handleCreateUpdate(null)}>
          Create Department
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DeptCards departments={data} />
      )}

      <CreateOrUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDepartmentSubmit}
        department={selectedDepartment}
      />
    </div>
  );
};

export default Departments;
