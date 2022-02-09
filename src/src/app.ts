import express from "express";
import { config } from "dotenv";
import { mustGetEnv } from "./util";
import postgraphile from "postgraphile";
import { Client } from "pg";

import createPostgraphileRouter from "./postgraphile/routes";
import { postGraphileOptions } from "./postgraphile/config";
import createAggregateRouter from "./aggregate/routes";

import cacheMiddleware from "./middleware/cache";
import errorMiddleware from "./middleware/errors";
import limiterMiddleware from "./middleware/ratelimiter";

config();

var app = express();

const dbIp = mustGetEnv("DB_IP");
const dbTable = mustGetEnv("DB_TABLE");
const dbPass = mustGetEnv("DB_PASS");
const dbPort = mustGetEnv("DB_PORT");
const dbUser = mustGetEnv("DB_USER");

const db = new Client(
  `postgres://${dbUser}:${dbPass}@${dbIp}:${dbPort}/${dbTable}`
);
db.connect();

const postGraphile = postgraphile(
  `postgres://${dbUser}:${dbPass}@${dbIp}:${dbPort}/${dbTable}`,
  "public",
  postGraphileOptions
);

app.use(limiterMiddleware);

app.use("/aggregate", createAggregateRouter(db));
app.use(createPostgraphileRouter());
app.use(postGraphile);

app.use(cacheMiddleware);
app.use(errorMiddleware);

app.get("/health", (req, res) => {
  res.statusCode = 200;
  res.send("ok");
});

app.listen(3000, "0.0.0.0");
