import cookieParser from "socket.io-cookie-parser";
import { Server } from "socket.io";
import { authMiddlewareIo } from "../middleware/authMiddlewareIo.js";
import { formatMessage } from "./tools/createMessageForm.js";
import { messages_data, user_data } from "../models/models.js";
import moment from "moment/moment.js";

export const initializeIo = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  const chat = io.of("/chat");
  chat.use(cookieParser());
  chat.use(authMiddlewareIo);

  chat.on("connection", async (socket) => {
    // Welcome new user
    console.log("User connected");
    let messages = (await messages_data.findAll()).map((message) => {
      return formatMessage(
        message.message_id,
        message.sender_id,
        message.sender_name,
        message.message_text,
        message.message_time
      );
    });

    socket.emit("chatMessages", messages);

    socket.broadcast.emit(
      "message",
      formatMessage(
        0,
        "FaceBook killer bot",
        "New user joined the chat. Welcome!"
      )
    );

    console.log("sockets are", io.engine.clientsCount);
    // Listen to the message
    socket.on("sendChatMessage", async (msg) => {
      console.log("chatMessage");
      const { id } = socket.user;
      const user = await user_data.findOne({ where: { id } });
      let message = await messages_data.create({
        message_text: msg,
        sender_id: id,
        message_time: moment().format("h:mm a"),
        sender_name: user.name,
      });
      const messageFormatted = formatMessage(
        message.message_id,
        message.sender_id,
        message.sender_name,
        message.message_text,
        message.message_time
      );
      chat.emit("getChatMessage", messageFormatted);
    });

    // Listen to disconnect
    socket.on("disconnect", () => {
      socket.removeAllListeners("chatMessage");
      socket.emit(
        "message",
        formatMessage("FaceBook killer bot", "", "User has left the chat")
      );
    });
  });
};
