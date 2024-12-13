// "use client";

// import { useEffect, useState } from "react";
// import { getStudentColumns } from "./columns";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import UpdateModal from "@/components/students/update-modal";
// import CreateModal from "@/components/students/create-modal";
// import DeleteModal from "@/components/students/delete-modal";
// import { axiosInstance } from "@/api/axios";
// import { T_STUDENT } from "@/types/student";
// import { DataTable } from "@/lib/data-table";

// export default function StudentsPage() {
//   const [data, setData] = useState<T_STUDENT[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
//   const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
//   const [selectedStudent, setSelectedStudent] = useState<T_STUDENT | null>(
//     null
//   );

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get("/student");
//       setData(response.data);
//     } catch (error: any) {
//       toast.error("Failed to fetch students data");
//       console.error("Error fetching students data", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleUpdate = (student: T_STUDENT) => {
//     setSelectedStudent(student);
//     setIsUpdateOpen(true);
//   };

//   const handleStudentUpdate = async (updatedData: T_STUDENT) => {
//     try {
//       await axiosInstance.put(
//         `/student/${updatedData.student_id}`,
//         updatedData
//       );
//       toast.success("Student updated successfully!");
//       setIsUpdateOpen(false);
//       fetchData();
//     } catch (error: any) {
//       toast.error(error.response.data.error);
//       console.error("Error updating student", error);
//     }
//   };

//   const handleCreate = () => {
//     setIsCreateOpen(true);
//   };

//   const handleStudentCreate = async (
//     newStudentData: Omit<T_STUDENT, "student_id">
//   ) => {
//     try {
//       await axiosInstance.post("/student", newStudentData);
//       toast.success("Student created successfully!");
//       setIsCreateOpen(false);
//       fetchData();
//     } catch (error: any) {
//       toast.error(error.response.data.error);
//       console.error("Error creating student", error.response.data);
//     }
//   };

//   const handleDelete = (student: T_STUDENT) => {
//     setSelectedStudent(student);
//     setIsDeleteOpen(true);
//   };

//   const handleStudentDelete = async (student: T_STUDENT) => {
//     try {
//       await axiosInstance.delete(`/student/${student.student_id}`);
//       toast.success("Student deleted successfully!");
//       setIsDeleteOpen(false);
//       fetchData();
//     } catch (error: any) {
//       toast.error("Failed to delete student");
//       console.error("Error deleting student", error);
//     }
//   };

//   const columns = getStudentColumns(handleUpdate, handleDelete);

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Students List</h1>
//         <Button onClick={handleCreate}>Create Student</Button>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <DataTable columns={columns} data={data} />
//       )}
//       <UpdateModal
//         isOpen={isUpdateOpen}
//         onClose={() => setIsUpdateOpen(false)}
//         student={selectedStudent}
//         onUpdate={handleStudentUpdate}
//       />
//       <CreateModal
//         isOpen={isCreateOpen}
//         onClose={() => setIsCreateOpen(false)}
//         onCreate={handleStudentCreate}
//       />
//       <DeleteModal
//         isOpen={isDeleteOpen}
//         onClose={() => setIsDeleteOpen(false)}
//         student={selectedStudent}
//         onDelete={handleStudentDelete}
//       />
//     </div>
//   );
// }

import StudentsPage from "@/components/students/students-page";

const MainStudentsPage= ()=> {
  return (
    <StudentsPage />
  )
     
}

export default MainStudentsPage;

