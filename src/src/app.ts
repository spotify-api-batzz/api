import { ConnectToDB, instance } from "./db";
import express from "express";
import { initModels } from "models/init-models";
import { omit, assocPath, unnest, clamp } from "ramda";
import Joi from "joi";
import cors from "cors";
import { config } from "dotenv";
import { mustGetEnv } from "./util";
import rateLimit from "express-rate-limit";

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

ConnectToDB(`postgres://${dbUser}:${dbPass}@${dbIp}:${dbPort}/${dbTable}`);
let models = initModels(instance);
const parseIncludes = (joinString: string) => {
  if (!joinString) return {};
  let joins = joinString.split(",");
  if (joins.length === 0) return {};
  let include = [];
  joins.forEach((join) => {
    let modelList = join.split(".");
    let baseInclude = {};
    if (modelList.length === 0) return "";
    modelList.forEach((item, i) => {
      baseInclude = assocPath(
        new Array(i).fill(1).map((i) => "include"),
        { model: models[modelList[i]] },
        baseInclude
      );
    });
    include.push(baseInclude);
  });
  return { include };
};

const schema = Joi.object({
  limit: Joi.number(),
  offset: Joi.number(),
  joins: Joi.array().items(Joi.string().valid(...Object.keys(models))),
});

interface modelMeta {
  limit: number;
  offset: number;
  joins: string[];
}

Object.keys(models).forEach((key) => {
  app.get(`/${key}`, async (req, res) => {
    const joins = req.query.joins
      ? unnest(
          (req.query.joins as string).split(",").map((join) => join.split("."))
        )
      : [];

    const { error, warning } = schema.validate({
      ...omit(["joins"], req.query),
      joins,
    });

    if (error) {
      res.send(error);
      return;
    }

    const settings = {
      limit: clamp(1, 500, parseInt(req.query?.limit as string) || 200),
      offset: req.query.offset,
      ...parseIncludes(req.query.joins as string),
    };

    console.log(settings);

    let items = await models[key].findAll({
      ...settings,
    });

    res.send({ data: items, meta: settings });
  });
});

app.get("/health", (req, res) => {
  res.statusCode = 200;
  res.send("ok");
});

app.listen(3000, "0.0.0.0");
