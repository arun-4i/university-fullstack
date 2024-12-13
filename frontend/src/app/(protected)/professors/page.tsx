"use client";

import React, { useEffect, useState } from "react";
import { getProfessorColumns } from "./columns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/api/axios";
import { T_PROFESSOR } from "@/types/student";
import UpdateModal from "@/components/professors/update-modal";
import CreateModal from "@/components/professors/create-modal";
import DeleteModal from "@/components/professors/delete-modal";
import { DataTable } from "@/lib/data-table";

export default function ProfessorsPage() {
  const [data, setData] = useState<T_PROFESSOR[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedProfessor, setSelectedProfessor] =
    useState<T_PROFESSOR | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/professor");
      setData(response.data);
    } catch (error: any) {
      toast.error("Failed to fetch professors data");
      console.error("Error fetching professors data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (professor: T_PROFESSOR) => {
    setSelectedProfessor(professor);
    setIsUpdateOpen(true);
  };

  const handleProfessorUpdate = async (updatedData: T_PROFESSOR) => {
    console.log("page data: ", updatedData);
    try {
      await axiosInstance.put(
        `/professor/${updatedData.professor_id}`,
        updatedData
      );
      toast.success("Professor updated successfully!");
      setIsUpdateOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update professor");
      console.error("Error updating Professor", error);
    }
  };

  const handleCreate = () => {
    setIsCreateOpen(true);
  };

  const handleProfessorCreate = async (
    newProfessorData: Omit<T_PROFESSOR, "professor_id">
  ) => {
    try {
      console.log("page data: ", newProfessorData);
      await axiosInstance.post("/professor", newProfessorData);
      toast.success("Professor created successfully!");
      setIsCreateOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error);
      console.error(error.response.data.error);
    }
  };

  const handleDelete = (professor: T_PROFESSOR) => {
    setSelectedProfessor(professor);
    setIsDeleteOpen(true);
  };

  const handleProfessorDelete = async (professor: T_PROFESSOR) => {
    try {
      await axiosInstance.delete(`/professor/${professor.professor_id}`);
      toast.success("Professor deleted successfully!");
      setIsDeleteOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error("Failed to delete Professor");
      console.error("Error deleting Professor", error);
    }
  };

  const columns = getProfessorColumns(handleUpdate, handleDelete);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Professors List</h1>
        <Button onClick={handleCreate}>Create Professor</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        professor={selectedProfessor}
        onUpdate={handleProfessorUpdate}
      />
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleProfessorCreate}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        professor={selectedProfessor}
        onDelete={handleProfessorDelete}
      />
    </div>
  );
}
