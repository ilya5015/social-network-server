import { Config } from "sequelize";

class FileController {
  async uploadFiles(req, res, next) {
    try {
      const { files } = req.files;
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
