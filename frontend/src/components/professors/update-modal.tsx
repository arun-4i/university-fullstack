"use client";
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
import { ProfessorSchema, T_PROFESSOR } from "@/types/student";
import { useEffect } from "react";
import Dropdown from "../dept-selector";

type UpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  professor: T_PROFESSOR | null;
  onUpdate: (data: T_PROFESSOR) => void;
};

const UpdateModal = ({
  isOpen,
  onClose,
  professor,
  onUpdate,
}: UpdateModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<T_PROFESSOR>({
    resolver: zodResolver(ProfessorSchema.omit({ professor_id: true })),
  });

  useEffect(() => {
    if (professor) {
      reset({
        ...professor,
        department_name: professor.Department.department_name || "",
      });
    }
  }, [professor, reset]);

  // Reset form when submission is successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data: Omit<T_PROFESSOR, "professor_id">) => {
    console.log("Form submitted with modal data:", data);
    if (professor) {
      onUpdate({ ...data, professor_id: professor.professor_id });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Professor</DialogTitle>
          <DialogDescription>Update Professor details here</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="text-right">
                First Name
              </Label>
              <Input
                id="first_name"
                {...register("first_name")}
                className="col-span-3"
              />
            </div>
            {errors.first_name && (
              <p className="text-red-500 text-xs flex justify-end">
                {errors.first_name.message}
              </p>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="text-right">
                Last Name
              </Label>
              <Input
                id="last_name"
                {...register("last_name")}
                className="col-span-3"
              />
            </div>
            {errors.last_name && (
              <p className="text-red-500 text-xs flex justify-end">
                {errors.last_name.message}
              </p>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
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
              <p className="text-red-500 text-xs flex justify-end">
                {errors.email.message}
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
