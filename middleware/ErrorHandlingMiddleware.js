import { ApiError } from "../controllers/errors/ErrorController.js";

export const errorHandlingMiddleware = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  } else {
    next();
  }
  return res.status(500).json({ message: "unexpected error" });
};
