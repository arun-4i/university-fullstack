import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { StudentSchema, T_STUDENT } from "@/types/student";
import Dropdown from "../dept-selector";

type UpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  student: T_STUDENT | null;
  onUpdate: (data: T_STUDENT) => void;
};

const UpdateModal = ({
  isOpen,
  onClose,
  student,
  onUpdate,
}: UpdateModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<T_STUDENT>({
    resolver: zodResolver(StudentSchema.omit({ student_id: true })),
  });

  useEffect(() => {
    if (student) {
      reset({
        ...student,
        dob: student.dob ? student.dob.split("T")[0] : "",
        department_name: student.Department.department_name || "",
      });
    }
  }, [student, reset]);

  const onSubmit = (data: Omit<T_STUDENT, "student_id">) => {
    if (student) {
      onUpdate({ ...data, student_id: student.student_id });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Student</DialogTitle>
          <DialogDescription>Update Student details here</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="col-span-1 text-right">
                First Name
              </Label>
              <Input
                id="first_name"
                {...register("first_name")}
                className="col-span-3"
              />
            </div>
            {errors.first_name && (
              <p className="text-red-500 text-xs text-right">
                {errors.first_name.message}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="col-span-1 text-right">
                Last Name
              </Label>
              <Input
                id="last_name"
                {...register("last_name")}
                className="col-span-3"
              />
            </div>
            {errors.last_name && (
              <p className="text-red-500 text-xs text-right">
                {errors.last_name.message}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="col-span-1 text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="col-span-3"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs text-right">
                {errors.email.message}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Date of Birth
              </Label>
              <div className="col-span-3">
                <input
                  type="date"
                  {...register("dob")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </div>
            {errors.dob && (
              <p className="text-red-500 text-xs text-right">
                {errors.dob.message}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="department_name"
                className="col-span-1 text-right"
              >
                Dept Name
              </Label>
              <div className="col-span-3">
                <Dropdown control={control} name="department_name" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
