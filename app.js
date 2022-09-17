import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import { sequelize } from "./db.js";
import fileUpload from "express-fileupload";
import { errorHandlingMiddleware } from "./middleware/ErrorHandlingMiddleware.js";
import { user_data, user_auth_data } from "./models/models.js";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import { formatMessage } from "./tools/createMessageForm.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT ?? 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);

// Обработка ошибок
app.use(errorHandlingMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({ message: "WORKING!!!" });
});

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
    const message = formatMessage("FaceBook killer bot", "", msg);
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

const start = async () => {
  try {
    await sequelize.authenticate;
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
