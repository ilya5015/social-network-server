import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const user_data = sequelize.define("user_data", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  status: { type: DataTypes.STRING, unique: false, defaultValue: "" },
});

export const user_auth_data = sequelize.define("user_auth_data", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: false },
});

export const messages_data = sequelize.define("messages_data", {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message_text: { type: DataTypes.STRING },
  sender_id: { type: DataTypes.INTEGER },
  sender_name: { type: DataTypes.STRING },
  message_time: { type: DataTypes.STRING },
});

export const threads_data = sequelize.define("threads_data", {
  thread_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: DataTypes.STRING },
  founder_id: { type: DataTypes.INTEGER },
  founder_name: { type: DataTypes.STRING },
  thread_text: { type: DataTypes.STRING },
  imgs: { type: DataTypes.STRING },
  thread_time: { type: DataTypes.STRING },
});

export const threads_replies_data = sequelize.define("threads_replies_data", {
  parent_thread_id: { type: DataTypes.INTEGER },
  reply_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reply_sender_id: { type: DataTypes.INTEGER },
  reply_sender_name: { type: DataTypes.STRING },
  reply_sender_role: { type: DataTypes.STRING },
  reply_text: {
    type: DataTypes.STRING,
  },
  imgs: { type: DataTypes.STRING },
  reply_time: { type: DataTypes.STRING },
});
