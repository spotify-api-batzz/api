import cors from "cors";
import express from "express";
import { Client } from "pg";
import postgraphile from "postgraphile";
import { getEnv, mustGetEnv } from "./util";

import createAggregateRouter from "./aggregate/routes";
import { postGraphileOptions } from "./postgraphile/config";
import createPostgraphileRouter from "./postgraphile/routes";

import { ConnectToDB } from "./db";
import cacheMiddleware from "./middleware/cache";
import errorMiddleware from "./middleware/errors";
import limiterMiddleware from "./middleware/ratelimiter";
import { initModels } from "./models/init-models";

const app = express();
const corsDomain = getEnv("cors", null);
if (corsDomain) {
  app.use(
    cors({
      origin: "https://spotify.batzz.me",
    })
  );
}

console.log("test");

const dbIp = mustGetEnv("DB_IP");
const dbTable = mustGetEnv("DB_TABLE");
const dbPass = mustGetEnv("DB_PASS");
const dbPort = mustGetEnv("DB_PORT");
const dbUser = mustGetEnv("DB_USER");

const connString = `postgres://${dbUser}:${dbPass}@${dbIp}:${dbPort}/${dbTable}`;

const db = new Client(connString);
db.connect();

const postGraphile = postgraphile(connString, "public", postGraphileOptions);
const sequelize = ConnectToDB(connString);
const sequelizeDb = initModels(sequelize);

app.use(limiterMiddleware);
app.use(cacheMiddleware);

app.use("/aggregate", createAggregateRouter(sequelizeDb));
app.use(createPostgraphileRouter());
app.use(postGraphile);

app.use(errorMiddleware);

app.get("/health", (req, res) => {
  res.statusCode = 200;
  res.send("ok");
});

app.listen(3000, "0.0.0.0");
