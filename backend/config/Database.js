import { Sequelize } from "sequelize";

const db = new Sequelize("gymappfyp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
