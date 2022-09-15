import jwt from "jsonwebtoken";

export const authMiddleware = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.cookies.token; //
    if (!token) {
      res.status(401).json({ message: "Пользователь не авторизован", token });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token is", decoded);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Пользователь не авторизован", token });
  }
};
