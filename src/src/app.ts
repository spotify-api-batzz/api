import cors from "cors";
import express from "express";
import { Pool } from "pg";
import postgraphile from "postgraphile";
import { getEnv, mustGetEnv } from "./util";

import createAggregateRouter from "./aggregate/routes";
import { postGraphileOptions } from "./postgraphile/config";
import createPostgraphileRouter from "./postgraphile/routes";

import cacheMiddleware from "./middleware/cache";
import errorMiddleware from "./middleware/errors";
import createIngestRouter from "./ingest";
import { Kysely, PostgresDialect } from "kysely";
import { DB } from "./kydb";

const app = express();
const corsDomain = getEnv("CORS", null);

if (corsDomain) {
  console.log(`using cors, origin ${corsDomain}`);
  app.use(
    cors({
      origin: corsDomain.split(","),
    })
  );
}

app.use(cors());

const dbIp = mustGetEnv("DB_IP");
const dbTable = mustGetEnv("DB_TABLE");
const dbPass = mustGetEnv("DB_PASS");
const dbPort = mustGetEnv("DB_PORT");
const dbUser = mustGetEnv("DB_USER");

const connString = `postgres://${dbUser}:${dbPass}@${dbIp}:${dbPort}/${dbTable}`;

const init = async () => {
  const pool = new Pool({ connectionString: connString });

  return pool;
};

const run = async () => {
  const pool = await init();

  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool,
    }),
  });

  app.use(cacheMiddleware);
  const postGraphile = postgraphile(pool, "public", postGraphileOptions);

  app.use("/aggregate", createAggregateRouter(db));
  app.use(createPostgraphileRouter());
  app.use(createIngestRouter());
  app.use(postGraphile);

  app.use(errorMiddleware);

  app.get("/health", (req, res) => {
    res.statusCode = 200;
    res.send("ok");
  });

  app.listen(3000, "0.0.0.0");
};

run();
