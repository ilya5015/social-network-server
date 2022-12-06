import { Router } from "express";
import { threadsRepliesDataController } from "../../controllers/board/threads_replies_data_controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

export const threadsRepliesDataRouter = new Router();

threadsRepliesDataRouter.get(
  "/getall/:parentThreadId",
  authMiddleware,
  threadsRepliesDataController.getAllThreadReplies
);
threadsRepliesDataRouter.get(
  "/getone/:parentThreadId/:threadReplyId",
  authMiddleware,
  threadsRepliesDataController.getThreadReply
);
threadsRepliesDataRouter.post(
  "/create",
  authMiddleware,
  threadsRepliesDataController.createNewThreadReply
);
