import { threads_replies_data } from "../../models/models.js";
import { threads_data } from "../../models/models.js";
import { user_data } from "../../models/models.js";
import { ApiError } from "../../error/ApiError.js";
import moment from "moment";

class ThreadsRepliesDataController {
  async getThreadReply(req, res, next) {
    try {
      const { parentThreadId, threadReplyId } = req.params;
      const threadReply = await threads_replies_data.findOne({
        where: { parent_thread_id: parentThreadId, reply_id: threadReplyId },
      });
      if (!thread) {
        next(ApiError.internal("Такого ответа не существует"));
      } else {
        res.json(threadReply);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllThreadReplies(req, res, next) {
    try {
      const { parentThreadId } = req.params;
      const replies = await threads_replies_data.findAll({
        where: { parent_thread_id: parentThreadId },
      });
      return res.json(replies);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createNewThreadReply(req, res, next) {
    try {
      const { id } = req.user;
      const { parentThreadId, replyText } = req.body;
      console.log("Req body is", req.body);
      const user = await user_data.findOne({ where: { id } });
      console.log("User is", user);
      const newCreatedThreadReply = await threads_replies_data.create({
        parent_thread_id: parentThreadId,
        reply_sender_id: id,
        reply_sender_name: user.name,
        reply_sender_role: "coco",
        reply_text: replyText,
        imgs: ["dasd"],
        reply_time: moment().format("h:mm a"),
      });
      console.log("New created thread", newCreatedThreadReply);
      if (!newCreatedThreadReply) {
        console.log("ERROOOOOOOOOOOOOOR");
        next(ApiError.internal("Не удалось создать thread reply"));
      } else {
        console.log("created");
        return res.json(newCreatedThreadReply);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const threadsRepliesDataController = new ThreadsRepliesDataController();
