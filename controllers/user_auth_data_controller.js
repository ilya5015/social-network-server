import { ApiError } from "../error/ApiError.js";
import { user_auth_data } from "../models/models.js";

class UserAuthDataController {
  async registration(req, res) {
    try {
      const { login, password } = req.body;
      console.log("REQUEST BODY IS", req.body);
      const userAuthData = await user_auth_data.create({
        login: login,
        password: password,
      });
      return res.json(userAuthData);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUserData(req, res) {
    return res.json("getUserData");
  }

  async getUsersData(req, res) {
    const users = await user_auth_data.findAll();
    return res.json(users);
  }
}

export const userAuthDataController = new UserAuthDataController();
