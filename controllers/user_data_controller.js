import { ApiError } from "../error/ApiError.js";
import { user_data } from "../models/models.js";

class UserDataController {
  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await user_data.findOne({ where: { id } });
      if (!user) {
        next(ApiError.internal("Такого пользователя не существует"));
      } else {
        res.json(user);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await user_data.findAll();
      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.user;
      const { status } = req.body;
      const updatedUserData = await user_data.update(
        { status },
        { where: { id } }
      );
      if (!updatedUserData) {
        next(ApiError.internal("Не удалось обновить статус"));
      } else {
        res.json(updatedUserData);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const userDataController = new UserDataController();
