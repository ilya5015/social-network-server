import { Router } from "express";
import { userDataController } from "../../controllers/userDataController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
export const userDataRouter = new Router();

userDataRouter.get("/user/:id", userDataController.getUser);
userDataRouter.get("/users", userDataController.getUsers);
userDataRouter.post(
  "/user/status",
  authMiddleware,
  userDataController.updateStatus
);
userDataRouter.get(
  "/authuserinfo",
  authMiddleware,
  userDataController.getAuthUserInfo
);
