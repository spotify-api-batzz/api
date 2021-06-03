import { ConnectToDB, instance } from "./db";
import express, { query } from "express";
import { initModels } from "models/init-models";
import {
  isNil,
  omit,
  pick,
  pipe,
  map,
  reduce,
  hasPath,
  assoc,
  assocPath,
  unnest,
} from "ramda";
import Joi from "joi";

var app = express();

ConnectToDB("postgres://test:123@192.168.0.27:5432/spotify");
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

Object.keys(models).forEach((key) => {
  app.get(`/${key}`, async (req, res) => {
    const joins = req.query.joins
      ? unnest(
          (req.query.joins as string).split(",").map((join) => join.split("."))
        )
      : [];

    console.log(joins);

    const { error, warning } = schema.validate({
      ...omit(["joins"], req.query),
      joins,
    });

    if (error) {
      res.send(error);
      return;
    }

    console.log(parseIncludes(req.query.joins as string));

    let items = await models[key].findAll({
      ...pick(["limit", "offset"], req.query),
      // hmm assertion
      ...parseIncludes(req.query.joins as string),
    });

    res.send(items);
  });
});

app.listen(3000);
