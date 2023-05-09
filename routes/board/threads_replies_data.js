import { Router } from "express";
import multer from "multer";
import { threadsRepliesDataController } from "../../controllers/board/ThreadsRepliesDataController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { v4 as uuidv4 } from "uuid";

export const threadsRepliesDataRouter = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/");
  },
  filename: function (req, file, cb) {
    let fileName = uuidv4() + ".jpg";
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

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
  upload.array("file"),
  threadsRepliesDataController.createNewThreadReply
);
