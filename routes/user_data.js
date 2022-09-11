import { Router } from "express";
import { userDataController } from "../controllers/user_data_controller.js";
export const userDataRouter = new Router();

userDataRouter.get("/user/:id", userDataController.getUser);
userDataRouter.get("/users", userDataController.getUsers);
