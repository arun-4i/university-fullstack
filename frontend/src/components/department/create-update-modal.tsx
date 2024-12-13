"use client";
import React, { useEffect } from "react";
import { DepartmentSchema, T_DEPARTMENT } from "@/types/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type CreateOrUpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<T_DEPARTMENT, "department_id">) => void;
  department?: T_DEPARTMENT | null; // If course is passed, it's update mode
};

const CreateOrUpdateModal = ({
  isOpen,
  onClose,
  onSubmit,
  department = null,
}: CreateOrUpdateModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Omit<T_DEPARTMENT, "course_id">>({
    resolver: zodResolver(DepartmentSchema.omit({ department_id: true })),
    defaultValues: department || {}, // This ensures fields are initialized with course data or empty
  });

  useEffect(() => {
    if (department) {
      console.log("dept details: ", department);
      reset({
        ...department,
      });
    } else {
      // Reset the form to default (empty) when switching to create mode
        reset({
        department_name: "",
      });
    }
  }, [department, reset, isOpen, isSubmitSuccessful]);

  const onFormSubmit = (data: Omit<T_DEPARTMENT, "department_id">) => {
    console.log("form data: ", data);
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {department ? "Update Department" : "Create Department"}
          </DialogTitle>
          <DialogDescription>
            {department
              ? "Update the department details below"
              : "Enter new department details"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
          <div className="grid gap-2 py-4">
            {/* Deparrtment Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department_name" className="text-right">
                Department Name
              </Label>
              <Input
                id="course_name"
                {...register("department_name")}
                className="col-span-3"
              />
            </div>
            {errors.department_name && (
              <p className="text-red-500 text-xs flex justify-end">
                {errors.department_name.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">
              {department ? "Update Department" : "Create Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateModal;
