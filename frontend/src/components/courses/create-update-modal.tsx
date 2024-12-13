"use client";
import React, { useEffect } from "react";
import { CourseSchema, T_COURSE } from "@/types/student";
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
import Dropdown from "../prof-selector";

type CreateOrUpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<T_COURSE, "course_id">) => void;
  course?: T_COURSE | null; // If course is passed, it's update mode
};

const CreateOrUpdateModal = ({
  isOpen,
  onClose,
  onSubmit,
  course = null,
}: CreateOrUpdateModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Omit<T_COURSE, "course_id">>({
    resolver: zodResolver(CourseSchema.omit({ course_id: true })),
    defaultValues: course || {}, // This ensures fields are initialized with course data or empty
  });

  useEffect(() => {
    if (course) {
      //   console.log("course details: ", course);
      reset({
        ...course,
        description: course.course_description || "",
        prof_name: course.Prof_name || "",
      });
    } else {
      // Reset the form to default (empty) when switching to create mode
      reset({
        course_name: "",
        course_description: "",
        prof_name: "",
      });
    }
  }, [course, reset, isOpen, isSubmitSuccessful]);

    const onFormSubmit = (data: Omit<T_COURSE, "course_id">) => {
      console.log("form data: ", data);
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {course ? "Update Course" : "Create Course"}
          </DialogTitle>
          <DialogDescription>
            {course
              ? "Update the course details below"
              : "Enter new course details"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
          <div className="grid gap-2 py-4">
            {/* Course Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course_name" className="text-right">
                Course Name
              </Label>
              <Input
                id="course_name"
                {...register("course_name")}
                className="col-span-3"
              />
            </div>
            {errors.course_name && (
              <p className="text-red-500 text-xs flex justify-end">
                {errors.course_name.message}
              </p>
            )}

            {/* Course Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Course Description
              </Label>
              <Input
                id="description"
                {...register("course_description")}
                className="col-span-3"
              />
            </div>
            {errors.course_description && (
              <p className="text-red-500 text-xs flex justify-end">
                {errors.course_description.message}
              </p>
            )}

            {/* Professor Name Selector */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prof_name" className="col-span-1 text-right">
                Professor Name
              </Label>
              <div className="col-span-3">
                <Dropdown control={control} name="prof_name" />
              </div>
            </div>
            {errors.prof_name && (
              <p className="text-red-500 text-xs text-right">
                {errors.prof_name.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">
              {course ? "Update Course" : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateModal;
