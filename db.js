import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_NAME);
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
