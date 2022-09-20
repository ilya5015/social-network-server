import cookieParser from "socket.io-cookie-parser";
import { Server } from "socket.io";
import { authMiddlewareIo } from "../middleware/authMiddlewareIo.js";
import { formatMessage } from "../tools/createMessageForm.js";

export const initializeIo = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.use(cookieParser());
  io.use(authMiddlewareIo);

  io.on("connection", (socket) => {
    // Welcome new user
    io.emit(
      "message",
      formatMessage(
        "FaceBook killer bot",
        "",
        "New user joined the chat. Welcome!"
      )
    );
    // Listen to the message
    socket.on("chatMessage", (msg) => {
      const message = formatMessage(socket.user.login, "", msg);
      io.emit("message", message);
    });

    // Listen to disconnect
    socket.on("disconnect", () => {
      io.emit(
        "message",
        formatMessage("FaceBook killer bot", "", "User has left the chat")
      );
    });
  });
};
