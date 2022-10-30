import { threads_data, user_data } from "../../models/models.js";
import { ApiError } from "../../error/ApiError.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import path from "path";

class ThreadsDataController {
  async getThread(req, res, next) {
    try {
      const { threadId } = req.params;
      const thread = await threads_data.findOne({
        where: { thread_id: threadId },
      });
      if (!thread) {
        next(ApiError.internal("Такого thread не существует"));
      } else {
        res.json(thread);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllThreads(req, res, next) {
    try {
      const threads = await threads_data.findAll();
      return res.json(threads);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createNewThread(req, res, next) {
    try {
      const { id } = req.user;
      const { title, thread_text, imgs } = req.body;

      let fileNames = [];

      imgs.forEach((img) => {
        let fileName = uuidv4() + ".jpg";
        fileNames.push(fileName);
      });

      console.log("imgs ARREEEE", imgs);

      const user = await user_data.findOne({ where: { id } });
      const newCreatedThread = await threads_data.create({
        title,
        founder_id: id,
        founder_name: user.name,
        thread_text,
        imgs: fileNames,
        thread_time: moment().format("h:mm a"),
      });
      if (!newCreatedThread) {
        next(ApiError.internal("Не удалось создать thread"));
      } else {
        imgs.forEach((img, index) => {
          console.log(
            "path is",
            path.resolve(__dirname, "..", "..", "static", fileNames[index])
          );
          img.mv(
            path.resolve(__dirname, "..", "..", "static", fileNames[index])
          );
        });
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const threadsDataController = new ThreadsDataController();
