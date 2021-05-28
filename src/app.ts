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
} from "ramda";

var app = express();

ConnectToDB("postgres://test:123@192.168.0.27:5432/spotify");
let models = initModels(instance);

const parseIncludes = (joins: string[]) => {
  let includes = { include: [] };
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
    includes.include.push(baseInclude);
  });
  return includes;
};

Object.keys(models).forEach((key) => {
  app.get(`/${key}`, async (req, res) => {
    let items = await models[key].findAll({
      ...pick(["limit", "offset"], req.query),
      ...parseIncludes((req.query.joins as string).split(",")),
    });

    res.send(items);
  });
});

app.listen(3000);
