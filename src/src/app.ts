import cors from "cors";
import express from "express";
import { Client, Pool } from "pg";
import postgraphile from "postgraphile";
import { getEnv, mustGetEnv } from "./util";

import createAggregateRouter from "./aggregate/routes";
import { postGraphileOptions } from "./postgraphile/config";
import createPostgraphileRouter from "./postgraphile/routes";

import { ConnectToDB } from "./db";
import cacheMiddleware from "./middleware/cache";
import errorMiddleware from "./middleware/errors";
import { initModels } from "./models/init-models";
import { AppContext } from "./types";

const app = express();
const corsDomain = getEnv("CORS", null);
if (corsDomain) {
  console.log(`using cors, origin ${corsDomain}`);
  app.use(
    cors({
      origin: corsDomain,
    })
  );
}

const dbIp = mustGetEnv("DB_IP");
const dbTable = mustGetEnv("DB_TABLE");
const dbPass = mustGetEnv("DB_PASS");
const dbPort = mustGetEnv("DB_PORT");
const dbUser = mustGetEnv("DB_USER");

const connString = `postgres://${dbUser}:${dbPass}@${dbIp}:${dbPort}/${dbTable}`;

const init = async (): Promise<AppContext> => {
  const pool = new Pool({ connectionString: connString });
  const sequelize = ConnectToDB(connString);
  const sequelizeDb = initModels(sequelize);

  return {
    pool,
    sequelize: sequelizeDb,
  };
};

const run = async () => {
  const { sequelize, pool } = await init();

  app.use(cacheMiddleware);
  const postGraphile = postgraphile(pool, "public", postGraphileOptions);

  app.use("/aggregate", createAggregateRouter(sequelize));
  app.use(createPostgraphileRouter());
  app.use(postGraphile);

  app.use(errorMiddleware);

  app.get("/health", (req, res) => {
    res.statusCode = 200;
    res.send("ok");
  });

  app.listen(3000, "0.0.0.0");
};

run();
