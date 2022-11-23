import { threads_data, user_data } from "../../models/models.js";
import { ApiError } from "../../error/ApiError.js";
import moment from "moment";
import multer from "multer";

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
      const { title, thread_text } = req.body;
      const files = req.files;
      console.log("Req body is", req.body, files);
      const user = await user_data.findOne({ where: { id } });
      console.log("User is", user);
      const newCreatedThread = await threads_data.create({
        title,
        founder_id: id,
        founder_name: user.name,
        thread_text,
        imgs: [],
        thread_time: moment().format("h:mm a"),
      });
      console.log("New created thread", newCreatedThread);
      if (!newCreatedThread) {
        console.log("ERROOOOOOOOOOOOOOR");
        next(ApiError.internal("Не удалось создать thread"));
      } else {
        console.log("Moved");
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const threadsDataController = new ThreadsDataController();
