import { Router } from "express";
import multer from "multer";
import { threadsDataController } from "../../controllers/board/threads_data_controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { v4 as uuidv4 } from "uuid";

export const threadsDataRouter = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/");
  },
  filename: function (req, file, cb) {
    let fileName = uuidv4() + ".jpg";
    cb(null, fileName);
  },
});

const upload = multer({ storage });

threadsDataRouter.get(
  "/getall",
  authMiddleware,
  threadsDataController.getAllThreads
);
threadsDataRouter.post(
  "/create",
  authMiddleware,
  upload.array("file"),
  threadsDataController.createNewThread
);
threadsDataRouter.get(
  "/getone/:id",
  authMiddleware,
  threadsDataController.getThread
);
