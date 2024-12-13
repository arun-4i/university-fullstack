"use client";
import { axiosInstance } from "@/api/axios";
import { T_COURSE } from "@/types/student";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCourseColumns } from "./columns";
import { DataTable } from "@/lib/data-table";
import CreateOrUpdateModal from "@/components/courses/create-update-modal";
import DeleteModal from "@/components/courses/delete-modal";

export default function CoursePage() {
  const [data, setData] = useState<T_COURSE[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<T_COURSE | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/course");
      setData(response.data);
    } catch (error: any) {
      toast.error("Failed to fetch course data");
      console.error("Error fetching course data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUpdate = (course: T_COURSE | null) => {
    // console.log("form data: ", course);
    setSelectedCourse(course); // Set course to update
    setIsModalOpen(true); // Open modal
  };

  const handleCourseSubmit = async (
    courseData: Omit<T_COURSE, "course_id">
  ) => {
    if (selectedCourse) {
      // Update course
      try {
        await axiosInstance.put(
          `/course/${selectedCourse.course_id}`,
          courseData
        );
        toast.success("Course updated successfully!");
        setIsModalOpen(false);
        fetchData();
      } catch (error: any) {
        toast.error(error.response.data.error);
        console.error("Error updating course", error.response.data);
      }
    } else {
      // Create course
      try {
        await axiosInstance.post("/course", courseData);
        toast.success("Course created successfully!");
        setIsModalOpen(false);
        fetchData();
      } catch (error: any) {
        toast.error(error.response.data.error);
        console.error("Error creating course", error.response.data);
      }
    }
  };

const handleDelete = (course: T_COURSE) => {
  setSelectedCourse(course); // Set course to delete
  setIsDeleteOpen(true); // Open modal
};
const handleCourseDelete = async (course: T_COURSE) => {
  try {
    await axiosInstance.delete(`/course/${course.course_id}`);
    toast.success("Course deleted successfully!");
    setIsDeleteOpen(false);
    fetchData();
  } catch (error: any) {
    toast.error("Failed to delete Course", error);
    console.error("Error deleting Course", error);
  }
};

  const columns = getCourseColumns(handleCreateUpdate, handleDelete);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Courses List</h1>
        <Button onClick={()=>handleCreateUpdate(null)}>Create Course</Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
      <CreateOrUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCourseSubmit}
        course={selectedCourse} // If null, it's create; if data, it's update
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        course={selectedCourse}
        onDelete={handleCourseDelete}
      />
    </div>
  );
}
