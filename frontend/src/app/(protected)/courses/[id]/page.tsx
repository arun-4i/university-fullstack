"use client";
import { axiosInstance } from "@/api/axios";
import StudentsPage from "@/components/students/students-page";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfCourse = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [professor, setProfessor] = useState<string>();
  const [course, setCourse] = useState<string>();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/course/${id}`);
      setProfessor(response.data.professor_name);
      setCourse(response.data.course_name);
    } catch (error: any) {
      toast.error("Failed to fetch professor");
      console.error("Error fetching professor", error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="text-4xl mb-4 text-"><span>{course}</span> - <span className="text-3xl text-gray-500">{professor}</span>
      </div>
      <StudentsPage courseId={id} />
    </div>
  );
};
export default ProfCourse;
