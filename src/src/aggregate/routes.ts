import { ValidationError } from "errors";
import { Database } from "../models/init-models";
import express from "express";
import Joi from "joi";
import AggregateHandler from "./handler";

const recentListensByMonthSchema = Joi.object({
  lessThan: Joi.number().required(),
  greaterThan: Joi.number().required(),
  userId: Joi.string().required(),
});

const createAggregateRouter = (db: Database) => {
  const aggregateRouter = express.Router();
  const aggregateHandler = new AggregateHandler(db);

  aggregateRouter.get("/recentlistensbymonth", async (req, res, next) => {
    const { error, value } = recentListensByMonthSchema.validate(req.query);
    if (error) next(new ValidationError(error));

    try {
      const data = await aggregateHandler.getRecentListensByUserIdBetweenDate(
        value.lessThan,
        value.greaterThan,
        value.userId
      );
      res.send(data);
    } catch (e) {
      console.log("caught error");
      next(e);
    }
  });

  return aggregateRouter;
};

export default createAggregateRouter;
