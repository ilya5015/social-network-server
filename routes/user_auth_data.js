import { Router } from "express";
import { userAuthDataController } from "../controllers/user_auth_data_controller.js";

export const userAuthDataRouter = new Router();

userAuthDataRouter.get("/user", userAuthDataController.getUserData);
userAuthDataRouter.get("/users", userAuthDataController.getUsersData);
userAuthDataRouter.post("/registration", userAuthDataController.registration);
