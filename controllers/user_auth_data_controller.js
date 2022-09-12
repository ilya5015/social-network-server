import { ApiError } from "../error/ApiError.js";
import { user_auth_data, user_data } from "../models/models.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (id, login, password) => {
  const token = jwt.sign(
    {
      id,
      login,
      password,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

class UserAuthDataController {
  async registration(req, res, next) {
    try {
      const { login, password, name, email } = req.body;
      if (!login || !password) {
        return next(ApiError.badRequest("Некорректный login или password"));
      }
      const candidate = await user_auth_data.findOne({ where: { login } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким именем существует")
        );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const userAuthData = await user_auth_data.create({
        login: login,
        password: hashPassword,
      });
      const userData = await user_data.create({
        id: userAuthData.id,
        name,
        email,
      });
      const token = generateJwt(
        userAuthData.id,
        userAuthData.login,
        userAuthData.password
      );
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    const { login, password } = req.body;
    const candidate = await user_auth_data.findOne({ where: { login } });
    if (!candidate) {
      return next(ApiError.internal("Пользователь с таким login не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, candidate.password);
    if (!comparePassword) {
      return next(ApiError.internal("Неверный password"));
    }
    const token = generateJwt(candidate.id, candidate.password);
    return res.json({ token });
  }

  async getUserData(req, res, next) {
    try {
      console.log("req query is", req.params);
      const { id } = req.params;
      let user;
      user = await user_auth_data.findOne({ where: { id } });
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUsersData(req, res, next) {
    try {
      const users = await user_auth_data.findAll();
      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export const userAuthDataController = new UserAuthDataController();
