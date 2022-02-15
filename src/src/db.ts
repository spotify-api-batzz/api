import { Sequelize } from "sequelize";

let instance: Sequelize;

const ConnectToDB = (connstring: string) => {
  if (!instance) {
    instance = new Sequelize(connstring);
  }
  return instance;
};

export { ConnectToDB, instance };
