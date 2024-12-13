"use server"

import { axiosInstance } from "@/api/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

interface LoginResponse {
  message: string;
  token: string;
}

export const loginHandler = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/user/login", {
      email,
      password,
    });

    if (response.data.token) {
      cookies().set("token", response.data.token);
    }
    
    return {
      success: true,
      message: response.data.message
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      // Backend is running but returned an error
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || "Login failed"
        };
      }
      // Backend is not running or network error
      return {
        success: false,
        message: "Unable to connect to server"
      };
    }
    // Unknown error
    return {
      success: false,
      message: "An unexpected error occurred"
    };
  }
};

export const logoutHandler = async () => {
  cookies().delete("token");
  redirect("/");
};
