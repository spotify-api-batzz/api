import { ConnectToDB, instance } from "./db";
import express from "express";
import { initModels, ModelTypes } from "models/init-models";
import { omit, assocPath, unnest, clamp } from "ramda";
import Joi from "joi";
import cors from "cors";
import { config } from "dotenv";
import { mustGetEnv } from "./util";
import rateLimit from "express-rate-limit";
import sequelize, { FindOptions, Model } from "sequelize";
import { APIError, InvalidRelation, UnknownError } from "errors";
import camelcase from "camelcase";

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
type Constructor<T> = Function & { prototype: T };
type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;

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

const sequelizeSettingsSchema = Joi.object({
  limit: Joi.number(),
  offset: Joi.number(),
  joins: Joi.array().items(Joi.string().valid(...Object.keys(models))),
});

let a: Model;

interface modelMeta {
  limit: number;
  offset: number;
  joins: string[];
}

interface Schema {
  model: ModelTypes;
  attribSchema: Joi.ArraySchema;
}

const schemas: Schema[] = Object.keys(models).map((key) => ({
  model: models[key],
  attribSchema: Joi.array().items(
    Joi.string().valid(...Object.keys(models[key].rawAttributes))
  ),
}));

schemas.forEach(({ model, attribSchema }) => {
  app.get(`/${camelcase(model.name)}`, async (req, res, next) => {
    console.log(typeof model);

    const joins = req.query.joins
      ? unnest(
          (req.query.joins as string).split(",").map((join) => join.split("."))
        )
      : [];

    let { error } = sequelizeSettingsSchema.validate({
      ...omit(["joins", "order"], req.query),
      joins,
    });

    if (error) {
      res.send(error);
      return;
    }

    if (req.query.order) {
      for (const key in req.query.order as Record<string, any>) {
        let { error } = attribSchema.validate(key);
        if (error) {
          res.send(error);
          return;
        }
      }
    }

    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const settings: FindOptions = {
      limit: clamp(1, 500, parseInt(req.query?.limit as string) || 200),
      offset,
      ...parseIncludes(req.query.joins as string),
    };

    // console.log(Object.keys(models[key]));
    // Object.keys(models[key].tableAttributes);

    try {
      //@ts-ignore
      let items = await model.findAll({
        ...settings,
      });
      res.send({ data: items, meta: settings });
    } catch (e) {
      next(e);
    }
  });
});

app.get("/health", (req, res) => {
  res.statusCode = 200;
  res.send("ok");
});

app.listen(3000, "0.0.0.0");

app.use((e, req, res, next) => {
  let realError: APIError;
  switch (e.name) {
    case "SequelizeEagerLoadingError":
      realError = new InvalidRelation(
        `Trying to load an invalid relation - ${e.message}`
      );
      break;
    default:
      realError = new UnknownError();
  }
  console.error(e);
  res.statusCode = realError.statusCode;
  res.send(serializeAPIError(realError));
});

export const serializeAPIError = (e: APIError) => ({
  error: e.name,
  message: e.message,
});
