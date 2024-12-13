"use client";

import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/api/axios";
import { toast } from "sonner";

type DropdownProps = {
  control: any;
  name: string;
};

const Dropdown = ({ control, name }: DropdownProps) => {
  const [departments, setDepartments] = useState<string[]>([]);

  const getDepartments = async () => {
    try {
      const response = await axiosInstance.get("/department");
      setDepartments(response.data.map((dept: any) => dept.department_name));
    } catch (error: any) {
      toast.error("Error fetching departments: " + error.message);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value || ""}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept, index) => (
              <SelectItem key={index} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default Dropdown;
