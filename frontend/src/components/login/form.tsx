"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginHandler } from "@/services/actions";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginResponse {
  success: boolean;
  message: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Logging in...");
    
    try {
      const response = await loginHandler(data.email, data.password) as LoginResponse;
      
      if (response.success) {
        toast.success(response.message, { id: toastId });
        router.push("/home");
        router.refresh();
      } else {
        toast.error(response.message, { id: toastId });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full"
          disabled={isLoading}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full"
          disabled={isLoading}
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
