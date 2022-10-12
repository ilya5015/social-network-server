import { Router } from "express";
import { threadsDataController } from "../../controllers/board/threads_data_controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

export const threadsDataRouter = new Router();

threadsDataRouter.get(
  "/getall",
  authMiddleware,
  threadsDataController.getAllThreads
);
threadsDataRouter.post(
  "/create",
  authMiddleware,
  threadsDataController.createNewThread
);
threadsDataRouter.get(
  "/getone/:id",
  authMiddleware,
  threadsDataController.getThread
);
