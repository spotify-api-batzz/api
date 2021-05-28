import { Sequelize, Model, DataTypes } from "sequelize";

let instance: Sequelize;

const ConnectToDB = (connstring: string) => {
  if (!instance) {
    instance = new Sequelize(connstring);
  }
};

export { ConnectToDB, instance };
