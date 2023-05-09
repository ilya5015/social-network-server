import jwt from "jsonwebtoken";

export const authMiddlewareIo = (socket, next) => {
  // try {
  //     const token = socket.cookies.token; //
  //     if (!token) {
  //       res.status(401).json({ message: "Пользователь не авторизован", token });
  //     }
  //     const decoded = jwt.verify(token, process.env.SECRET_KEY);
  //     console.log("Decoded token is", decoded);
  //     req.user = decoded;
  //     next();
  //   } catch (e) {
  //     res.status(401).json({ message: "Пользователь не авторизован", token });
  //   }
  // if (isValid(socket.request)) {
  //   next();
  // } else {
  //   next(new Error("invalid"));
  // }
  try {
    console.log(socket.handshake.headers.cookie);
    if (socket.request.cookies) {
      const token = socket.request.cookies.token;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      socket.user = decoded;
      next();
    } else {
      console.log("Not authorized");
      setTimeout(() => {
        console.log("Socket will be disconnected in 2 sec");
        socket.disconnect(true);
      }, 2000);
      next(new Error("User is not authorized"));
    }
  } catch (e) {
    console.log("error is", e);
    next();
  }
};
