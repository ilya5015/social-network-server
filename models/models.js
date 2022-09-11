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
