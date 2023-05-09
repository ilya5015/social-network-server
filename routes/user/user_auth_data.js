import { Router } from "express";
import { userAuthDataController } from "../../controllers/userAuthDataController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

export const userAuthDataRouter = new Router();

userAuthDataRouter.get("/users", userAuthDataController.getUsersData);
userAuthDataRouter.post("/registration", userAuthDataController.registration);
userAuthDataRouter.post("/login", userAuthDataController.login);
userAuthDataRouter.get(
  "/isauth",
  authMiddleware,
  userAuthDataController.checkIsAuth
);
userAuthDataRouter.get(
  "/authuserdata",
  authMiddleware,
  userAuthDataController.getAuthUserData
);
