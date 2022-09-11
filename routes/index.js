import { Router } from "express";
import { userAuthDataRouter } from "./user_auth_data.js";
import { userDataRouter } from "./user_data.js";

export const router = new Router();

router.use("/userAuthData", userAuthDataRouter);

router.use("/userData", userDataRouter);
