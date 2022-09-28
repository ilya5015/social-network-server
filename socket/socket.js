import cookieParser from "socket.io-cookie-parser";
import { Server } from "socket.io";
import { authMiddlewareIo } from "../middleware/authMiddlewareIo.js";
import { formatMessage } from "../tools/createMessageForm.js";
import { messages_data, user_data } from "../models/models.js";

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

  io.on("connection", async (socket) => {
    // Welcome new user
    console.log("User connected");
    let messages = (await messages_data.findAll()).map((message) => {
      console.log("message", message);
      return formatMessage(
        message.sender_id,
        message.sender_name,
        message.message_text
      );
    });
    console.log("messages are", messages);
    socket.broadcast.emit("chatMessages", messages);

    socket.broadcast.emit(
      "message",
      formatMessage(
        "FaceBook killer bot",
        "",
        "New user joined the chat. Welcome!"
      )
    );
    socket.broadcast.emit(messages);
    // Listen to the message
    socket.on("chatMessage", async (msg) => {
      console.log("chatMessage");
      const { id } = socket.user;
      const user = await user_data.findOne({ where: { id } });
      const message = formatMessage(user.id, user.name, msg);
      await messages_data.create({
        message_text: message.text,
        sender_id: id,
        message_time: message.time,
        sender_name: user.name,
      });
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
