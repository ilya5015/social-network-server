import cookieParser from "socket.io-cookie-parser";
import { Server } from "socket.io";
import { authMiddlewareIo } from "../middleware/authMiddlewareIo.js";
import { formatMessage } from "../tools/createMessageForm.js";
import { user_data } from "../models/models.js";

export const initializeIo = (server) => {
  const io = new Server(server, {
    path: "/socketchat",
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.use(cookieParser());
  io.use(authMiddlewareIo);

  io.on("connection", (socket) => {
    // Welcome new user
    console.log("User connected");
    socket.broadcast.emit(
      "message",
      formatMessage(
        "FaceBook killer bot",
        "",
        "New user joined the chat. Welcome!"
      )
    );
    // Listen to the message
    socket.on("chatMessage", async (msg) => {
      console.log("chatMessage");
      const { id } = socket.user;
      const user = await user_data.findOne({ where: { id } });
      const message = formatMessage(user.login, user.name, msg);
      socket.emit("message", message);
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
