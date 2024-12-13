// drop-down-dept.tsx
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
import { T_PROFESSOR } from "@/types/student";

type DropdownProps = {
  control: any; // You can specify a more strict type depending on your form setup
  name: string;
};

const Dropdown = ({ control, name }: DropdownProps) => {
  const [professors, setProfessors] = useState<string[]>([]);

  const getProfessors = async () => {
    try {
      const response = await axiosInstance.get("/professor");
      setProfessors(
        response.data.map(
          (professor: T_PROFESSOR) =>
            `${professor.first_name} ${professor.last_name}`
        )
      );
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching professors data", error);
    }
  };

  useEffect(() => {
    getProfessors();
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
            {professors.map((professor, index) => (
              <SelectItem key={index} value={professor}>
                {professor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default Dropdown;
