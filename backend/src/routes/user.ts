import { Router } from "express";
import userController from "../controller/user-controller";

export const userRouter = Router();

userRouter.post("/login", userController.loginUser);
