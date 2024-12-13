"use client";
import React, { useEffect, useState } from "react";
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
import { StudentSchema, T_DEPARTMENT, T_STUDENT } from "@/types/student";
import { axiosInstance } from "@/api/axios";
import { toast } from "sonner";
import Dropdown from "../dept-selector";


type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: Omit<T_STUDENT, "student_id">) => void;
};

const CreateModal = ({ isOpen, onClose, onCreate }: CreateModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Omit<T_STUDENT, "student_id">>({
    resolver: zodResolver(StudentSchema.omit({ student_id: true })),
  });


  useEffect(() => {
    // getDepartments();
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data: Omit<T_STUDENT, "student_id">) => {
    console.log("Form submitted with data:", data);
    onCreate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Student</DialogTitle>
          <DialogDescription>Enter new student details here</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid gap-2 py-4">
            {/* firstname */}
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
            {/* last name */}
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
            {/* email */}
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
            {/* dob */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="col-span-1 text-right">
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
            {/* dept name */}
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
            {errors.department_name && (
              <p className="text-red-500 text-xs text-right">
                {errors.department_name.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
