import { Router } from "express";
import { threadsDataRouter } from "./board/threads_data.js";
import { userAuthDataRouter } from "./user/user_auth_data.js";
import { userDataRouter } from "./user/user_data.js";
import { threadsRepliesDataRouter } from "./board/threads_replies_data.js";

export const router = new Router();

router.use("/userAuthData", userAuthDataRouter);

router.use("/userData", userDataRouter);

router.use("/threadsData", threadsDataRouter);

router.use("/threadsRepliesData", threadsRepliesDataRouter);
