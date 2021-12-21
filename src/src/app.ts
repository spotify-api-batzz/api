import express from "express";
import { reject, equals } from "ramda";
import cors from "cors";
import { config } from "dotenv";
import { mustGetEnv } from "./util";
import rateLimit from "express-rate-limit";
import { APIError, InvalidRelation, UnknownError } from "errors";
import postgraphile from "postgraphile";
import { JSONPgSmartTags, makeJSONPgSmartTagsPlugin } from "graphile-utils";
import PgConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import { postgraphilePolyRelationCorePlugin } from "postgraphile-polymorphic-relation-plugin";

config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (req, res, next, options) => {
    const auth = req.header("authorization");
    if (auth === authKey) {
      next();
      return;
    }
    res.status(options.statusCode).send(options.message);
  },
});

var app = express();
app.use(cors());
app.use(limiter);

const dbIp = mustGetEnv("DB_IP");
const dbTable = mustGetEnv("DB_TABLE");
const dbPass = mustGetEnv("DB_PASS");
const dbPort = mustGetEnv("DB_PORT");
const dbUser = mustGetEnv("DB_USER");
const authKey = mustGetEnv("AUTH_HEADER");

const tags = {
  version: 1,
  config: {
    attribute: {
      ["public.thumbnails.entity_type"]: {
        description:
          "E'@isPolymorphic\n@polymorphicTo Album\n@polymorphicTo Artist'",
      },
    },
  },
} as JSONPgSmartTags;

app.use("/songs", (req, res) => {
  res.send(
    "This page has moved, check out https://spotify-api.batzz.io/graphiql!"
  );
});

app.use(
  postgraphile(
    `postgres://${dbUser}:${dbPass}@${dbIp}:${dbPort}/${dbTable}`,
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      exportGqlSchemaPath: "schema.graphql",
      appendPlugins: [
        makeJSONPgSmartTagsPlugin(tags),
        PgConnectionFilterPlugin,
        postgraphilePolyRelationCorePlugin,
      ],
      graphileBuildOptions: {
        connectionFilterPolymorphicForward: true,
        connectionFilterPolymorphicBackward: true,
      },
    }
  )
);

app.get("/health", (req, res) => {
  res.statusCode = 200;
  res.send("ok");
});

app.listen(3000, "0.0.0.0");

app.use((e, req, res, next) => {
  let realError: APIError = e instanceof APIError ? e : new UnknownError();
  switch (e.name) {
    case "SequelizeEagerLoadingError":
      realError = new InvalidRelation(
        `Trying to load an invalid relation - ${e.message}`
      );
      break;
  }
  console.error(e);
  res.statusCode = realError.statusCode;
  res.send(serializeAPIError(realError));
});

export const serializeAPIError = (e: APIError) =>
  reject(equals(undefined))({
    error: e.name,
    message: e.message,
    data: e?.body,
  });
