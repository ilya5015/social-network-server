import { threads_data } from "../../models/models.js";
import { ApiError } from "../../error/ApiError.js";

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
      const {
        title,
        founder_id,
        founder_name,
        thread_text,
        imgs,
        thread_time,
      } = req.body;
      const newCreatedThread = await threads_data.create({
        title,
        founder_id,
        founder_name,
        thread_text,
        imgs,
        thread_time,
      });
      if (!newCreatedThread) {
        next(ApiError.internal("Не удалось создать thread"));
      } else {
        res.json(newCreatedThread);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const threadsDataController = new ThreadsDataController();
