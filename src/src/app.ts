import express, { RequestHandler } from "express";
import { reject, equals } from "ramda";
import cors from "cors";
import { config } from "dotenv";
import { mustGetEnv } from "./util";
import rateLimit from "express-rate-limit";
import { APIError, InvalidRelation, UnknownError } from "errors";
import postgraphile, { PostGraphileResponseNode } from "postgraphile";
import { JSONPgSmartTags, makeJSONPgSmartTagsPlugin } from "graphile-utils";
import PgConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import { postgraphilePolyRelationCorePlugin } from "postgraphile-polymorphic-relation-plugin";
import PgAggregatesPlugin from "@graphile/pg-aggregates";
import PgSimplifyInflector from "@graphile-contrib/pg-simplify-inflector";
import { EndpointCacheInformation, Endpoints } from "types";

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
      "public.thumbnails.entity_type": {
        tags: {
          isPolymorphic: true,
          polymorphicTo: ["Album", "Artist"],
        },
      },
    },
  },
} as JSONPgSmartTags;

const cacheDefaults = Object.keys(Endpoints).reduce(
  (prev, key) => ({ ...prev, [key]: { maxAge: "3600" } }),
  {}
) as EndpointCacheInformation;

const cacheTime: EndpointCacheInformation = {
  ...cacheDefaults,
  recentListens: { maxAge: "10" },
};

app.use("/songs", (req, res) => {
  res.send(
    "This page has moved, check out https://spotify-api.batzz.io/graphiql !"
  );
});

const postGraphile = postgraphile(
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
      PgAggregatesPlugin,
      postgraphilePolyRelationCorePlugin,
      PgSimplifyInflector,
    ],
    graphileBuildOptions: {
      connectionFilterPolymorphicForward: true,
      connectionFilterPolymorphicBackward: true,
      connectionFilterRelations: true,
      connectionFilterComputedColumns: false,
      connectionFilterSetofFunctions: false,
      connectionFilterArrays: false,
    },
  }
);

app.get("/graphql", (req, res, next) => {
  req.method = "POST";
  req.method = "POST";
  req.url = "/graphql ";
  const stringQuery = Buffer.from(req.query.query as string, "base64");
  const payload = {
    query: stringQuery.toString("utf-8"),
    operationName: req.query.operationName,
    variables: req.query.variables,
  };
  const cacheAgeKey = req.header("x-cache-age-key");
  if (cacheAgeKey) {
    console.log(cacheAgeKey);
    console.log(`max-age=${cacheTime[cacheAgeKey] || 3600}`);
    res.header("cache-control", `max-age=${cacheTime[cacheAgeKey] || 3600}`);
  }
  const originalBody = req.body;
  req.body = payload;
  next();
});

app.use(postGraphile);

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
