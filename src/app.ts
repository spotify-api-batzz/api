import { ConnectToDB, instance } from "./db";
import express from "express";
import { initModels } from "models/init-models";
import { omit, assocPath, unnest, clamp } from "ramda";
import Joi from "joi";
import cors from "cors";

var app = express();
app.use(cors());

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

interface modelMeta {
  limit: number;
  offset: number;
  joins: string[];
}

const meta = (settings: Partial<modelMeta>) => {};

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

app.listen(3000, "0.0.0.0");
